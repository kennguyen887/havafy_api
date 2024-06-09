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

  @Column({ type: 'boolean', default: false })
  verified!: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  type!: Nullable<ProfileType>;

  @Column({ type: 'varchar', length: 300, nullable: true })
  workplaceTypes!: Nullable<string>;

  @Column({ type: 'varchar', length: 300, nullable: true })
  jobTypes!: Nullable<string>;

  @Column({ type: 'varchar', length: 300, nullable: true })
  title!: Nullable<string>;

  @Column({ type: 'varchar', length: 300, nullable: true })
  fullname!: Nullable<string>;

  @Column({ type: 'text', nullable: true })
  about!: Nullable<string>;

  @Column({ default: 0, nullable: true, type: 'int' })
  experienceYear!: Nullable<number>;

  @Column({ type: 'varchar', length: 5, nullable: true })
  countryCode!: Nullable<string>;

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
  experience!: Nullable<any>;

  @Column({ type: 'jsonb', nullable: true })
  certifications!: Nullable<any>;

  @Column({ type: 'jsonb', nullable: true })
  projects!: Nullable<any>;

  @Column({ type: 'jsonb', nullable: true })
  skills!: Nullable<any>;

  @Column({ type: 'jsonb', nullable: true })
  languages!: Nullable<any>;

  @Column({
    type: 'varchar',
    length: 50,
    default: ProfileStatus.DRAFT,
    nullable: true,
  })
  status!: Nullable<ProfileStatus>;

  @Column({ type: 'jsonb', nullable: true })
  contact!: Nullable<any>;

  @Column({ type: 'jsonb', nullable: true })
  attributes!: Nullable<any>;

  @ManyToOne(() => UserEntity, (user) => user.profiles)
  user!: UserEntity;
}
