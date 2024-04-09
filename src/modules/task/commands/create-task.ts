import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateTaskReqDto } from '../dto';
import { TaskService } from '../task.service';

export class CreateTaskCommand {
  constructor(
    public readonly userId: string,
    public readonly data: CreateTaskReqDto,
  ) {}
}

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler
  implements ICommandHandler<CreateTaskCommand>
{
  constructor(private readonly taskService: TaskService) {}

  async execute(command: CreateTaskCommand): Promise<void> {
    const { data, userId } = command;

    return this.taskService.createTask(userId, data);
  }
}
