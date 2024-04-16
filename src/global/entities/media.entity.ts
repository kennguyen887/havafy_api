import { Entity, Index, Column, ManyToOne } from 'typeorm';
import { MediaStatus, FeatureType } from '../models';
import { BaseEntity } from './base.entity';
import { Nullable } from 'src/global/utils/types';
import { UserEntity } from './user.entity';

@Entity({
  name: 'media',
})
export class MediaEntity extends BaseEntity {
  constructor(partial: Partial<MediaEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Index('media-userId-idx')
  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  title!: Nullable<string>;

  @Column({ type: 'varchar', length: 500 })
  url!: string;

  @Column({ type: 'varchar', length: 50 })
  featureType!: FeatureType;

  @Column({ type: 'uuid' })
  featureId!: string;

  @Column({ type: 'varchar', length: 50, default: MediaStatus.DRAFT })
  status!: MediaStatus;

  @Column({ type: 'jsonb', nullable: true })
  attributes!: Nullable<any>;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;
}
