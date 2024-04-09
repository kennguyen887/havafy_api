import { Entity, Index, Column, ManyToOne } from 'typeorm';
import { CommentStatus, FeatureType } from '../models';
import { IdentityEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'comments',
})
export class CommentEntity extends IdentityEntity {
  constructor(partial: Partial<CommentEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Index('comment-userId-idx')
  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  title!: string;

  @Column({ type: 'varchar', length: 50 })
  status!: CommentStatus;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 50 })
  featureType!: FeatureType;

  @Column({ type: 'uuid' })
  featureId!: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;
}
