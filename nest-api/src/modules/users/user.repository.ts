import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { UserEntity, UserId } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserModel, UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /** 🔹 Get all users (without passwords) */
  public async getAllUsers(): Promise<UserModel[]> {
    const users = await this.userRepository.find();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...safeUser }) => safeUser);
  }

  /** 🔹 Get users by one or more roles */
  public async getUsersByRole(
    role: UserRole | UserRole[],
  ): Promise<UserModel[]> {
    const roles = Array.isArray(role) ? role : [role];
    const users = await this.userRepository.find({
      where: { role: In(roles) },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...safeUser }) => safeUser);
  }

  /** 🔹 Create user with hashed password */
  public async createUser(user: CreateUserModel): Promise<UserModel> {
    const hashedPassword: string = await bcrypt.hash(user.password, 10);

    const entity = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    const saved = await this.userRepository.save(entity);
    const { password: _password, ...safeUser } = saved;
    return safeUser;
  }

  /** 🔹 Find user by email */
  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /** 🔹 Find user by ID */
  public async getUserById(id: UserId): Promise<UserModel | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }

  /** 🔹 Update user (rehash password if changed) */
  public async updateUser(id: UserId, data: Partial<CreateUserModel>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.userRepository.update(id, data);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    const { password: _password, ...safeUser } = user;
    return safeUser;
  }
}
