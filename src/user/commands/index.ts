import { UpdateUserCommandHandler } from './update-user';
import { CreateUserByGoogleAccountCommandHandler } from './create-user-by-google-account';
import { ResetPasswordCommandHandler } from './reset-password';

export * from './update-user';
export * from './create-user-by-google-account';
export * from './reset-password';

export const CommandHandlers = [
  UpdateUserCommandHandler,
  CreateUserByGoogleAccountCommandHandler,
  ResetPasswordCommandHandler,
];
