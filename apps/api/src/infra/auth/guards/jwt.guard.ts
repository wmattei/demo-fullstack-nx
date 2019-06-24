import { parseInArray } from '@demo-fullstack-nx/api-interface';
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return parseInArray(
            whiteList,
            context.switchToHttp().getRequest().route.path
        )
            ? true
            : super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}

export const whiteList: string[] = ['api/auth/*'];
