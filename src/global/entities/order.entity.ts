import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { UserEntity } from './user.entity';
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ShippingMethod,
} from '../models';

@Entity({
  name: 'orders',
})
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('order-userId-idx')
  @Column()
  userId!: string;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  grandTotal!: number;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  subTotal!: number;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: null,
    nullable: true,
  })
  discountTotal!: number;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: null,
    nullable: true,
  })
  taxAmount!: number;

  @Column({ type: 'varchar', length: 10, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ type: 'varchar', length: 10, default: PaymentStatus.PENDING })
  paymentStatus!: PaymentStatus;

  @Column({ type: 'json', nullable: true })
  shippingAddress!: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  paymentAddress!: Record<string, any>;

  @Column({ type: 'varchar', length: 10, nullable: true })
  paymentMethod!: PaymentMethod;

  @Column({ type: 'varchar', length: 10, nullable: true })
  shippingMethod!: ShippingMethod;

  @Column({ type: 'text', nullable: true })
  note!: string;

  @Column({ type: 'varchar', length: 3 })
  currency!: string;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  items!: OrderItemEntity[];

  @Column({ type: 'json', nullable: true })
  attributes!: Record<string, any>;

  @ManyToOne(() => UserEntity, (user) => user.products)
  user!: UserEntity;

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
