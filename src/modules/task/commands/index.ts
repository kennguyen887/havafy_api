import { CreateTaskCommandHandler } from './create-task';
import { DeleteTaskCommandHandler } from './delete-task';

export * from './create-task';
export * from './delete-task';

export const CommandHandlers = [
  CreateTaskCommandHandler,
  DeleteTaskCommandHandler,
];
