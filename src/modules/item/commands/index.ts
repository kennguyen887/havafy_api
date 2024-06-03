import { CreateItemCommandHandler } from './create-item';
import { DeleteItemCommandHandler } from './delete-item';
import { UpdateItemCommandHandler } from './update-item';
import { LinkItemCommandHandler } from './link-item';

export * from './create-item';
export * from './update-item';
export * from './delete-item';
export * from './link-item';

export const CommandHandlers = [
  CreateItemCommandHandler,
  DeleteItemCommandHandler,
  UpdateItemCommandHandler,
  LinkItemCommandHandler,
];
