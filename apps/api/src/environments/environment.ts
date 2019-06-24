import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@demo-fullstack-nx/api-interface';
import { DefaultNamingStrategy } from 'typeorm';
import { CustomNamingStrategy } from '../infra/custom-naming-strategy';
import { MasterUser1561292516547 } from '../migrations/1561292516547-MasterUser';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    tokenExpireTime: null,
    db: <TypeOrmModuleOptions>{
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '',
        database: 'node',
        schema: 'public',
        synchronize: true,
        logger: 'advanced-console',
        entityPrefix: 'app_',
        namingStrategy: new CustomNamingStrategy()
    }
};
