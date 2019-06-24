import { MigrationInterface, QueryRunner, LessThanOrEqual } from 'typeorm';
import { Permission, User } from '@demo-fullstack-nx/api-interface';

export class Roles1561320254448 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.connection
            .createQueryBuilder()
            .insert()
            .into(Permission)
            .values([
                {
                    id: 1,
                    createdAt: new Date(),
                    label: 'User creation',
                    enabled: true,
                    description: 'Write permission in user feature',
                    name: 'WRITE_USER'
                },
                {
                    id: 2,
                    createdAt: new Date(),
                    label: 'User view',
                    enabled: true,
                    description: 'Read permission in user feature',
                    name: 'READ_USER'
                }
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.connection
            .createQueryBuilder()
            .delete()
            .from(Permission)
            .where({ id: LessThanOrEqual(2) })
            .execute();
    }
}
