import { Entity, Column, OneToMany } from 'typeorm';
import { OrderEntity } from './order.entity';
import { TaskEntity } from './task.entity';
import { ProductUserRemainEntity } from './product-user-remain.entity';
import { ProductUserUsageEntity } from './product-user-usage.entity';
import { IdentityEntity } from './base.entity';

@Entity({
  name: 'users',
})
export class UserEntity extends IdentityEntity {
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

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
    unique: true,
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

  @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.user)
  tasks!: TaskEntity[];

  @OneToMany(
    () => ProductUserRemainEntity,
    (productUserRemain) => productUserRemain.user,
  )
  productUserRemain!: ProductUserRemainEntity[];

  @OneToMany(
    () => ProductUserUsageEntity,
    (productUserUsage) => productUserUsage.user,
  )
  productUserUsage!: ProductUserUsageEntity[];
}
