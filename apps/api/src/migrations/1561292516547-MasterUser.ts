import { MigrationInterface, QueryRunner } from 'typeorm';
import { Encryptor } from '../infra/auth/encryptor';
import { User } from '@demo-fullstack-nx/api-interface';

export class MasterUser1561292516547 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(
            `
            INSERT INTO ${queryRunner.connection.getMetadata(User).tableName} 
            (id, enabled, email, name, password, username, created_at, role) VALUES 
            (1000, true, 'admin@admin.com', 'Admin',
            '${Encryptor.encrypt('admin')}', 'admin', now(), 'ADMIN')
        `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(
            `
            DELETE FROM ${
                queryRunner.connection.getMetadata(User).tableName
            } WHERE id = 1000;
        `,
            []
        );
    }
}
