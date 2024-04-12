import { Entity, Index, Column, ManyToOne } from 'typeorm';
import { TaskStatus, DoneType, TaskCurrency } from '../models';
import { Nullable } from 'src/global/utils/types';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'tasks',
})
export class TaskEntity extends BaseEntity {
  constructor(partial: Partial<TaskEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Index('task-userId-idx')
  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar', length: 300 })
  title!: string;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  budget!: number;

  @Column({ type: 'varchar', length: 50, default: TaskStatus.DRAFT })
  status!: TaskStatus;

  @Column({ type: 'text', nullable: true })
  description!: Nullable<string>;

  @Column({ type: 'timestamp', nullable: true })
  doneAt!: Nullable<Date>;

  @Column({ type: 'varchar', length: 50, default: DoneType.FLEXIABLE })
  doneType!: Nullable<DoneType>;

  @Column({ type: 'varchar', length: 200 })
  location!: Nullable<string>;

  @Column({ type: 'varchar', length: 3, nullable: true })
  currency!: Nullable<TaskCurrency>;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt!: Nullable<Date>;

  @Column({ type: 'json', nullable: true })
  attributes!: Nullable<any>;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;
}
