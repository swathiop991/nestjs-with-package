import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRoles } from '@shared/constants';
import { ROLESKEY } from '../../api-gateway/authentication/vehicle-owner/decorators/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLESKEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { req } = ctx.getContext();
    const { user } = req;
    const userRole = user.role.toLowerCase();
    if (requiredRoles.indexOf(userRole) > -1) {
      return true;
    }
    return false;
  }
}
