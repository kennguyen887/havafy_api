import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTaskListItemDto } from '../dto';
import { TaskService } from '../task.service';

export class GetTaskDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetTaskDetailQuery)
export class GetTaskDetailHandler implements IQueryHandler<GetTaskDetailQuery> {
  constructor(private readonly taskService: TaskService) {}

  async execute(query: GetTaskDetailQuery): Promise<GetTaskListItemDto> {
    const { id } = query;
    return this.taskService.getTask(id);
  }
}
