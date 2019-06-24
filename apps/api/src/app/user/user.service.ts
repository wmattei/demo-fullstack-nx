import { UserCredentials } from '@demo-fullstack-nx/api-interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/api-interface/src';
import { Repository } from 'typeorm';
import { Encryptor } from '../../infra/auth/encryptor';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    getAll() {
        return this.userRepository.find();
    }

    store(user: User) {
        console.log(user);
    }

    findByEmailOrUsename(credentials: UserCredentials): Promise<User> {
        return this.userRepository.findOne({
            where: [
                {
                    email: credentials.email,
                    enabled: true
                },
                {
                    username: credentials.username,
                    enabled: true
                }
            ]
        });
    }

    findByCredentials(credentials: UserCredentials): Promise<User> {
        return this.userRepository.findOne({
            where: [
                {
                    email: credentials.email,
                    password: Encryptor.encrypt(credentials.password),
                    enabled: true
                },
                {
                    username: credentials.username,
                    password: Encryptor.encrypt(credentials.password),
                    enabled: true
                }
            ]
        });
    }
}
