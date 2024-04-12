import { CreateCommentCommandHandler } from './create-comment';
import { DeleteCommentCommandHandler } from './delete-comment';

export * from './create-comment';
export * from './delete-comment';

export const CommandHandlers = [
  CreateCommentCommandHandler,
  DeleteCommentCommandHandler,
];
