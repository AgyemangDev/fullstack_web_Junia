import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './user.dto';
import { UserModel } from './user.model';

// Decorator pour définir les rôles requis sur une route
export const Roles = Reflector.createDecorator<UserRole | UserRole[]>();

// Guard pour vérifier que l'utilisateur a le bon rôle
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Récupérer les rôles requis depuis le decorator @Roles
    const requiredRoles = this.reflector.getAllAndOverride<
      UserRole | UserRole[]
    >(Roles, [context.getHandler(), context.getClass()]);

    // Si aucun rôle n'est requis, autoriser l'accès
    if (!requiredRoles) {
      return true;
    }

    // Récupérer l'utilisateur depuis la requête
    const request = context.switchToHttp().getRequest<{ user?: UserModel }>();
    const user = request.user;

    // Convertir en tableau si ce n'est pas déjà le cas
    const rolesArray = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    // Vérifier que l'utilisateur a un des rôles requis
    return user ? rolesArray.some((role) => user.role === role) : false;
  }
}
