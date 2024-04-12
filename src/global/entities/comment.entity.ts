import { Entity, Index, Column, ManyToOne } from 'typeorm';
import { CommentStatus, FeatureType } from '../models';
import { BaseEntity } from './base.entity';
import { Nullable } from 'src/global/utils';
import { UserEntity } from './user.entity';

@Entity({
  name: 'comments',
})
export class CommentEntity extends BaseEntity {
  constructor(partial: Partial<CommentEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Index('comment-userId-idx')
  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  title!: Nullable<string>;

  @Column({ type: 'varchar', length: 50 })
  status!: CommentStatus;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 50 })
  featureType!: FeatureType;

  @Column({ type: 'uuid' })
  featureId!: string;

  @Column({ type: 'json', nullable: true })
  attributes!: Nullable<any>;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;
}
