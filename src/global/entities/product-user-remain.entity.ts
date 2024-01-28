import { Entity, Index, Column, ManyToOne } from 'typeorm';
import { ProductType, ProductUsageType } from '../models';
import { UserEntity } from './user.entity';
import { IdentityEntity } from './base.entity';

@Entity({
  name: 'product_user_remain',
})
export class ProductUserRemainEntity extends IdentityEntity {
  constructor(partial: Partial<ProductUserRemainEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Index('product-user-remain-userId-idx')
  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', length: 300 })
  productName!: string;

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
  remainAmount!: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;
}
