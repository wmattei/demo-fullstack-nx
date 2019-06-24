import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../../app/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { environment } from '../../environments/environment';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'APP_SECRET',
            signOptions: environment.tokenExpireTime
                ? {
                      expiresIn: environment.tokenExpireTime
                  }
                : {}
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
