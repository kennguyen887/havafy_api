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

  @Column()
  active!: boolean;

  @Column({
    name: 'first_name',
  })
  firstName!: string;

  @Column({
    name: 'last_name',
  })
  lastName!: string;

  @Column()
  email!: string;

  @Column({
    name: 'email_verified',
  })
  emailVerified!: boolean;

  @Column({
    type: String,
    name: 'password_reset_token',
    unique: true,
    nullable: true,
  })
  passwordResetToken!: string | null;

  @Column({
    type: Date,
    nullable: true,
    name: 'password_reset_expired',
  })
  passwordResetExpired!: Date | null;

  @Column({
    type: String,
    nullable: true,
  })
  locale!: string | null;

  @Column({
    name: 'password',
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
    name: 'google_id',
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
