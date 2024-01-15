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
  @Column({ type: 'varchar', name: 'user_id', length: 36 })
  userId!: string;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    name: 'grand_total',
    default: 0,
  })
  grandTotal!: number;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    name: 'subtotal',
    default: 0,
  })
  subtotal!: number;

  @Column({
    type: 'decimal',
    name: 'discount_total',
    precision: 18,
    scale: 6,
    default: null,
    nullable: true,
  })
  discountTotal!: number;

  @Column({
    type: 'decimal',
    name: 'tax_amount',
    precision: 18,
    scale: 6,
    default: null,
    nullable: true,
  })
  taxAmount!: number;

  @Column({
    type: 'decimal',
    name: 'promo_discount',
    precision: 18,
    scale: 6,
    default: null,
    nullable: true,
  })
  promoDiscount!: number;

  @Column({ type: 'varchar', length: 50, name: 'promo_code' })
  promoCode!: string;

  @Column({ type: 'varchar', length: 10, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({
    type: 'varchar',
    length: 10,
    default: PaymentStatus.PENDING,
    name: 'payment_status',
  })
  paymentStatus!: PaymentStatus;

  @Column({ type: 'json', nullable: true, name: 'shipping_address' })
  shippingAddress!: Record<string, any>;

  @Column({ type: 'json', nullable: true, name: 'payment_address' })
  paymentAddress!: Record<string, any>;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    name: 'payment_method',
  })
  paymentMethod!: PaymentMethod;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    name: 'shipping_method',
  })
  shippingMethod!: ShippingMethod;

  @Column({ type: 'text', nullable: true })
  note!: string;

  @Column({ type: 'varchar', length: 3 })
  currency!: string;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  items!: OrderItemEntity[];

  @Column({ type: 'json', nullable: true })
  attributes!: Record<string, any>;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: Date;
}
