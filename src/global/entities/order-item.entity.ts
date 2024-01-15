import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductAttribute } from '../models';
import { OrderEntity } from './order.entity';

@Entity({
  name: 'order-items',
})
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('orderItem-orderId-idx')
  @Column()
  orderId!: string;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  sku!: string;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  price!: number;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  basePrice!: number;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'json', nullable: true })
  attributes!: ProductAttribute;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order!: OrderEntity;

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
