import { Entity, Index, Column, ManyToOne } from 'typeorm';
import { ProfileStatus, ProfileType, ExpectedRatePer } from '../models';
import { Nullable } from 'src/global/utils/types';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'profiles',
})
export class ProfileEntity extends BaseEntity {
  constructor(partial: Partial<ProfileEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Index('profile-userId-idx')
  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', length: 300 })
  title!: string;

  @Column({ type: 'text' })
  about!: string;

  @Column({ default: 0, nullable: true, type: 'int' })
  experienceYear!: number;

  @Column({ type: 'varchar', length: 5, nullable: true })
  countryCode!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city!: string;

  @Column({
    type: 'decimal',
    precision: 2,
    scale: 6,
    default: 0,
    nullable: true,
  })
  reviewRate!: Nullable<number>;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    nullable: true,
  })
  expectedRate!: Nullable<number>;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    default: ExpectedRatePer.HOUR,
  })
  expectedRatePer!: Nullable<ExpectedRatePer>;

  @Column({ type: 'jsonb', nullable: true })
  experience!: Nullable<string>;

  @Column({ type: 'jsonb', nullable: true })
  certifications!: Nullable<string>;

  @Column({ type: 'jsonb', nullable: true })
  projects!: Nullable<string>;

  @Column({ type: 'jsonb', nullable: true })
  skills!: Nullable<string>;

  @Column({ type: 'jsonb', nullable: true })
  languages!: Nullable<string>;

  @Column({ type: 'varchar', length: 50, default: ProfileStatus.DRAFT })
  status!: ProfileStatus;

  @Column({ type: 'varchar', length: 100, default: ProfileType.OTHER })
  type!: ProfileType;

  @Column({ type: 'jsonb', nullable: true })
  contact!: Nullable<string>;

  @Column({ type: 'jsonb', nullable: true })
  attributes!: Nullable<string>;

  @ManyToOne(() => UserEntity, (user) => user.profiles)
  user!: UserEntity;
}
