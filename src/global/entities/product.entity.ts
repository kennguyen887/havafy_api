import { Entity, Index, Column } from 'typeorm';
import { ProductStatus, ProductType, ProductAttribute } from '../models';
import { Nullable } from 'src/global/utils/types';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'products',
})
export class ProductEntity extends BaseEntity {
  constructor(partial: Partial<ProductEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Index('product-userId-idx')
  @Column({ type: 'uuid', nullable: true })
  userId!: Nullable<string>;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  sku!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  thumbnail!: Nullable<string>;

  @Column({ default: 0, nullable: true, type: 'int' })
  quantity!: Nullable<number>;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  price!: number;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    nullable: true,
  })
  basePrice!: Nullable<number>;

  @Column({ type: 'varchar', length: 50, default: ProductStatus.DRAFT })
  status!: ProductStatus;

  @Column({
    type: 'varchar',
    length: 50,
    default: ProductType.MAIN,
  })
  productType!: ProductType;

  @Column({ type: 'text', nullable: true })
  description!: Nullable<string>;

  @Column({ type: 'varchar', length: 3 })
  currency!: Nullable<string>;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt!: Nullable<Date>;

  @Column({ type: 'boolean', default: false })
  isHidden!: boolean;

  @Column({ type: 'json', nullable: true })
  attributes!: Nullable<ProductAttribute>;
}
