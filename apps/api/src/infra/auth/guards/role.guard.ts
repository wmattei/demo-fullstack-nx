import { User, Role } from '@demo-fullstack-nx/api-interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!roles) return true;

        const user: User = context.switchToHttp().getRequest().user;

        if (user.role === Role.ADMIN) return true;

        const hasRole = roles.includes(user.role);
        return user && user.role && hasRole;
    }
}
