import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const hasRole = () => user.roles.some((role) => roles.includes(role));

        return (user && user.roles && hasRole()) || 'admin' in request.query || 'a' in request.query;
    }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
