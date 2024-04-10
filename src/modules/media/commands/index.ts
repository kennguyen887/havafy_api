import { CreateMediaCommandHandler } from './create-media';
import { DeleteMediaCommandHandler } from './delete-media';

export * from './create-media';
export * from './delete-media';

export const CommandHandlers = [
  CreateMediaCommandHandler,
  DeleteMediaCommandHandler,
];
