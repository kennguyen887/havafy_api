import { Entity, Index, Column, ManyToOne } from 'typeorm';
import { ItemStatus, ItemType } from '../models';
import { Nullable } from 'src/global/utils/types';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'items',
})
export class ItemEntity extends BaseEntity {
  constructor(partial: Partial<ItemEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Index('item-userId-idx')
  @Column({ type: 'uuid', nullable: true })
  userId!: Nullable<string>;

  @Column({ type: 'varchar', length: 300, nullable: true })
  title!: string;

  @Column({ type: 'varchar', length: 50, default: ItemStatus.DRAFT })
  status!: ItemStatus;

  @Column({ type: 'varchar', length: 50, default: ItemType.OTHER })
  type!: ItemType;

  @Column({ type: 'text', nullable: true })
  description!: Nullable<string>;

  @Column({ type: 'jsonb', nullable: true })
  attributes!: Nullable<any>;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;
}
