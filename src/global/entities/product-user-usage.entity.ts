import {
  Entity,
  Index,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProductType, ProductUsageType } from '../models';
import { UserEntity } from './user.entity';
import { IdentityEntity } from './base.entity';
import { Nullable } from 'src/global/utils/types';

@Entity({
  name: 'product_user_usage',
})
export class ProductUserUsageEntity extends IdentityEntity {
  constructor(partial: Partial<ProductUserUsageEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Index('product-user-usage-userId-idx')
  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', length: 150 })
  sku!: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: ProductType.MAIN,
  })
  productType!: ProductType;

  @Column({
    type: 'varchar',
    length: 50,
    default: ProductUsageType.COUNT,
  })
  productUsageType!: ProductUsageType;

  @Column({ default: 0, type: 'int' })
  usageAmount!: number;

  @Column({ type: 'json', nullable: true })
  payloadRequest!: Nullable<object>;

  @Column({ type: 'json', nullable: true })
  outputResult!: Nullable<object>;

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

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;
}
