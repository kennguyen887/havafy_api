import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProductType, ProductUsageType } from '../models';
import { UserEntity } from './user.entity';

@Entity({
  name: 'product_user_usage',
})
export class ProductUserUsageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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
  payloadRequest!: string;

  @Column({ type: 'json', nullable: true })
  outputResult!: string;

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
