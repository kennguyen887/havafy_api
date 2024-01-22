import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'boolean',
  })
  active!: boolean;

  @Column({
    type: 'varchar',
  })
  firstName!: string;

  @Column({
    type: 'varchar',
  })
  lastName!: string;

  @Column({
    type: 'varchar',
  })
  email!: string;

  @Column({
    type: 'boolean',
  })
  emailVerified!: boolean;

  @Column({
    type: String,
    unique: true,
    nullable: true,
  })
  passwordResetToken!: string | null;

  @Column({
    type: Date,
    nullable: true,
  })
  passwordResetExpired!: Date | null;

  @Column({
    type: String,
    nullable: true,
  })
  locale!: string | null;

  @Column({
    name: 'password',
    type: String,
  })
  passwordHash!: string;

  @Column({
    type: String,
    nullable: true,
  })
  token!: string | null;

  @Column({
    type: String,
    nullable: true,
  })
  avatar!: string | null;

  @Column({
    type: String,
    nullable: true,
  })
  googleId!: string | null;

  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.user)
  orders!: OrderEntity[];

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
