/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory, Reflector } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app/app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { JwtAuthGuard } from './infra/auth/guards/jwt.guard';
import { LoggerInterceptor } from './infra/http/interceptors/logger.interceptor';
import { RoleGuard } from './infra/auth/guards/role.guard';
import { PermissionGuard } from './infra/auth/guards/permission.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(helmet());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalGuards(
        new JwtAuthGuard(),
        new RoleGuard(new Reflector()),
        new PermissionGuard(new Reflector())
    );
    app.useGlobalInterceptors(new LoggerInterceptor());

    const port = process.env.port || 3333;

    await app.listen(port, () => {
        console.log('Listening at http://localhost:' + port + '/' + 'api');
    });
}

bootstrap();
