import { Entity, Index, Column, ManyToOne } from 'typeorm';
import { ProductAttribute } from '../models';
import { OrderEntity } from './order.entity';
import { IdentityEntity } from './base.entity';

import { Nullable } from 'src/global/utils';

@Entity({
  name: 'order_items',
})
export class OrderItemEntity extends IdentityEntity {
  constructor(partial: Partial<OrderItemEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Index('orderItem-orderId-idx')
  @Column({ type: 'uuid' })
  orderId!: string;

  @Column({ default: 0, nullable: true, type: 'int' })
  quantity!: number;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  sku!: string;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  price!: number;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
  })
  basePrice!: Nullable<number>;

  @Column({ type: 'text', nullable: true })
  description!: Nullable<string>;

  @Column({ type: 'json', nullable: true })
  attributes!: Nullable<ProductAttribute>;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order!: OrderEntity;
}
