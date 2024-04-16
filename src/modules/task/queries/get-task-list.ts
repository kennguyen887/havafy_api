import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetTaskListResponseDto, GetTaskListQueryDto } from '../dto';
import { TaskService } from '../task.service';

export class GetTaskListQuery {
  constructor(public readonly parameters: GetTaskListQueryDto) {}
}

@QueryHandler(GetTaskListQuery)
export class GetTaskListQueryHandler
  implements IQueryHandler<GetTaskListQuery>
{
  constructor(private readonly taskService: TaskService) {}

  async execute(query: GetTaskListQuery): Promise<GetTaskListResponseDto> {
    const { parameters } = query;
    return this.taskService.getList(parameters);
  }
}
