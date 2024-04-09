import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TaskService } from '../task.service';

export class DeleteTaskCommand {
  constructor(public readonly userId: string, public readonly taskId: string) {}
}

@CommandHandler(DeleteTaskCommand)
export class CreateTaskCommandHandler
  implements ICommandHandler<DeleteTaskCommand>
{
  constructor(private readonly taskService: TaskService) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    const { taskId, userId } = command;

    return this.taskService.deleteTask(userId, taskId);
  }
}
