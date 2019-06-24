import { UserCredentials } from '@demo-fullstack-nx/api-interface';
import {
    Body,
    Controller,
    Headers,
    Post,
    UseGuards,
    HttpCode
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    async login(@Body() user: UserCredentials): Promise<any> {
        return this.authService.login(user);
    }

    @Post('logout')
    @HttpCode(200)
    async logout(): Promise<any> {
        return this.authService.logout();
    }
}
