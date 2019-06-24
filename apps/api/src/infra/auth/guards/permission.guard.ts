import { Role, User } from '@demo-fullstack-nx/api-interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const permissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler()
        );
        if (!permissions) return true;

        const user: User = context.switchToHttp().getRequest().user;
        console.log(user);
        if (user.role === Role.ADMIN) return true;

        const hasRole = user.permissions
            .map(per => per.name)
            .some(per => permissions.includes(per));
        return user && user.role && hasRole;
    }
}
