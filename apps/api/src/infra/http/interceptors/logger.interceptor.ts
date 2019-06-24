import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log(
            'Init --> ',
            context.switchToHttp().getRequest().route.path
        );

        const now = Date.now();

        return next
            .handle()
            .pipe(
                tap(() =>
                    console.log(
                        'End  --> ',
                        context.switchToHttp().getRequest().route.path,
                        Date.now() - now,
                        'ms'
                    )
                )
            );
    }
}
