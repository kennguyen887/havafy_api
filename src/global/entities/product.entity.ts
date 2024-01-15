import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus, ProductType, ProductAttribute } from '../models';
import { UserEntity } from './user.entity';

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('product-userId-idx')
  @Column()
  userId!: string;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @Column({ type: 'varchar', length: 150 })
  sku!: string;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  price!: number;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  basePrice!: number;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: null,
    nullable: true,
  })
  discountPrice!: number | null;

  @Column({ type: 'varchar', length: 50, default: ProductStatus.DRAFT })
  status!: ProductStatus;

  @Column({ type: 'varchar', length: 50, default: ProductType.MAIN })
  productType!: ProductType;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'varchar', length: 3 })
  currency!: string;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt?: Date;

  @Column({ type: 'boolean', default: false })
  isHidden!: boolean;

  @Column({ type: 'json', nullable: true })
  attributes!: ProductAttribute;

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
