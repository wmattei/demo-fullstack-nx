import { User } from '@demo-fullstack-nx/api-interface';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @Post()
    store(@Body() user: User) {
        this.userService.store(user);
    }
}
