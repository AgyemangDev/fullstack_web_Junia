import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard JWT pour protéger les routes nécessitant une authentification
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
