import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { CreateUserModel, UserModel } from './user.model';
import { UpdateUserDto, UserRole } from './user.dto';
import * as bcrypt from 'bcrypt';
import { UserId } from './user.entity';

export interface LoginResponse {
  user: UserModel;
  access_token: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  async getUsersByRole(role: UserRole | UserRole[]) {
    return this.userRepository.getUsersByRole(role);
  }

  async createUser(user: CreateUserModel): Promise<UserModel> {
    const existingUser = await this.userRepository.getUserByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    if (!Object.values(UserRole).includes(user.role)) {
      throw new BadRequestException(
        `Invalid role. Allowed roles: ${Object.values(UserRole).join(', ')}`,
      );
    }

    return this.userRepository.createUser(user);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserModel | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pwd, ...safeUser } = user;
    return safeUser;
  }

  async loginUser(
    email: string,
    password: string,
    expectedRole?: UserRole,
  ): Promise<LoginResponse> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (expectedRole && user.role !== expectedRole) {
      throw new BadRequestException(
        `User does not have the required role: ${expectedRole}`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pwd, ...safeUser } = user;

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      user: safeUser,
      access_token,
    };
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return this.userRepository.updateUser(id as UserId, data);
  }

  async getUserById(id: string) {
    return this.userRepository.getUserById(id as UserId);
  }
}
