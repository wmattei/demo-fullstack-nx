import { BaseEntity } from '../base';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Role } from './role';
import { titleCase } from '../util/string.utils';
import { Permission } from './permission.entity';

@Entity()
export class User extends BaseEntity {
    @IsEmail(
        { allow_utf8_local_part: true },
        { message: 'Email must be defined' }
    )
    @Column({ unique: true })
    email: string;

    @IsNotEmpty()
    @Column()
    name: string;

    @Column()
    @IsNotEmpty()
    @Exclude()
    password: string;

    @Column({ unique: true })
    @IsNotEmpty()
    username: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @ManyToMany(type => Permission, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permission[];
}
