import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus, ProductType, ProductAttribute } from '../models';

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('product-userId-idx')
  @Column({ type: 'varchar', name: 'user_id', length: 36 })
  userId!: string;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  sku!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  thumbnail!: string;

  @Column({ default: 0, nullable: true, type: 'int' })
  quantity!: number;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  price!: number;

  @Column({
    type: 'decimal',
    name: 'base_price',
    precision: 18,
    scale: 6,
    default: 0,
  })
  basePrice!: number;

  @Column({ type: 'varchar', length: 50, default: ProductStatus.DRAFT })
  status!: ProductStatus;

  @Column({
    type: 'varchar',
    name: 'product_type',
    length: 50,
    default: ProductType.MAIN,
  })
  productType!: ProductType;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'varchar', length: 3 })
  currency!: string;

  @Column({ type: 'timestamp', nullable: true, name: 'published_at' })
  publishedAt?: Date;

  @Column({ type: 'boolean', default: false, name: 'is_hidden' })
  isHidden!: boolean;

  @Column({ type: 'json', nullable: true })
  attributes!: ProductAttribute;

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
