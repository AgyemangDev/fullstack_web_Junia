import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { UserModel } from './user.model';
import { UserId } from './user.entity';

// Interface pour le payload du token JWT
interface JwtPayload {
  sub: string; // user ID
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      // Extraction du token depuis le header Authorization
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Clé secrète pour valider le token
      secretOrKey: process.env.JWT_SECRET || 'babel-library-secret-key-change-in-production',
    });
  }

  // Méthode appelée automatiquement par Passport pour valider le token
  async validate(payload: JwtPayload): Promise<UserModel> {
    // Vérifier que l'utilisateur existe toujours
    const user = await this.userRepository.getUserById(payload.sub as UserId);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Retourner l'utilisateur qui sera accessible via req.user
    return user;
  }
}

