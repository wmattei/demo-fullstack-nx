import { User, UserCredentials } from '@demo-fullstack-nx/api-interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../app/user/user.service';
import { environment } from '../../environments/environment';
import { BadCredentialsException } from '../http/exceptions/bad-credentials-exceptions';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    private async validate(userData: UserCredentials): Promise<User> {
        return await this.userService.findByCredentials(userData);
    }

    public async login(
        user: UserCredentials
    ): Promise<any | BadCredentialsException> {
        return this.validate(user).then(userData => {
            if (!userData) {
                return new BadCredentialsException();
            }
            const accessToken = this.jwtService.sign({
                id: userData.id,
                name: userData.name,
                email: userData.email
            });

            return {
                expires_in: environment.tokenExpireTime,
                access_token: accessToken,
                user: userData,
                status: 200
            };
        });
    }

    public async validateUser(credentials) {
        return await this.userService.findByEmailOrUsename(credentials);
    }

    public logout() {
        return {
            status: 200,
            message: 'Bye!'
        };
    }
}
