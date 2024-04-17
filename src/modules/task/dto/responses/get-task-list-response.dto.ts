import { Exclude, Expose, Type } from 'class-transformer';
import { TaskAttributes, TaskStatus, DoneType } from 'src/global/models';
import { PaginationResponse } from 'src/global/models';
import { Nullable } from 'src/global/utils';

export class GetTaskListItemDto {
  @Expose()
  id!: string;

  @Expose()
  userId!: string;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  @Type(() => Number)
  price!: number;

  @Expose()
  @Type(() => Number)
  budget!: number;

  @Expose()
  status!: TaskStatus;

  @Expose()
  doneAt!: Nullable<Date>;

  @Expose()
  doneType!: Nullable<DoneType>;

  @Expose()
  location!: Nullable<string>;

  @Expose()
  currency!: string;

  @Expose()
  attributes!: TaskAttributes;
}

@Exclude()
export class GetTaskListResponseDto extends PaginationResponse {
  constructor(data: GetTaskListItemDto[], pagination: PaginationResponse) {
    super(pagination);
    this.data = data;
  }

  @Expose()
  data!: GetTaskListItemDto[];
}
