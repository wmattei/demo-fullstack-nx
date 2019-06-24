import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base';

@Entity()
export class Permission extends BaseEntity {
    @Column()
    name: string;

    @Column()
    label: string;

    @Column()
    description: string;
}
