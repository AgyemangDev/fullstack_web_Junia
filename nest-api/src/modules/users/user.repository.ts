import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity, UserId } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserModel, UserModel } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getAllUsers(): Promise<UserModel[]> {
    const users = await this.userRepository.find();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...safeUser }) => safeUser);
  }

  public async createUser(user: CreateUserModel): Promise<UserModel> {
    // 1️⃣ Hash password before saving
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const hashedPassword: string = await bcrypt.hash(user.password, 10);

    const entity = this.userRepository.create({
      ...user,
      password: hashedPassword, // save hashed password
    });

    const saved = await this.userRepository.save(entity);

    // 2️⃣ Return safe user object (omit password)
    const { password: _password, ...safeUser } = saved;
    return safeUser;
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  public async getUserById(id: UserId): Promise<UserModel | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }

  public async updateUser(id: UserId, data: Partial<CreateUserModel>) {
    if (data.password) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      data.password = await bcrypt.hash(data.password, 10);
    }
    await this.userRepository.update(id, data);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    const { password: _password, ...safeUser } = user;
    return safeUser;
  }
}
