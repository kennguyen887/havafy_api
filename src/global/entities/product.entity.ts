import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ProductStatus, ProductType, ProductAttribute } from '../models';
import { UserEntity } from './user.entity';

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  active!: boolean;

  @Index('product-userId-idx')
  @Column()
  userId!: string;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

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
  discountPrice!: number;

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
}
