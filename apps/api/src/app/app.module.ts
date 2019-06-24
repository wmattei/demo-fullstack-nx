import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { environment } from '../environments/environment';
import { AuthModule } from '../infra/auth/auth.module';
import { UserModule } from './user/user.module';
import { MasterUser1561292516547 } from '../migrations/1561292516547-MasterUser';
import { User } from '@demo-fullstack-nx/api-interface';
import { Permission } from '@demo-fullstack-nx/api-interface';
import { Roles1561320254448 } from '../migrations/1561320254448-Roles';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...environment.db,
            migrations: [MasterUser1561292516547, Roles1561320254448],
            entities: [User, Permission]
        }),

        //Features
        UserModule,
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
    constructor(private readonly connection: Connection) {
        connection.runMigrations();
    }
}
