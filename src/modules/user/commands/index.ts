import { UpdateUserCommandHandler } from './update-user';
import { CreateUserByGoogleAccountCommandHandler } from './create-user-by-google-account';
import { SendResetPasswordTokenCommandHandler } from './send-reset-password-token';
import { ChangePasswordByResetTokenCommandHandler } from './change-password-by-reset-token';

export * from './update-user';
export * from './create-user-by-google-account';
export * from './send-reset-password-token';
export * from './change-password-by-reset-token';

export const CommandHandlers = [
  UpdateUserCommandHandler,
  CreateUserByGoogleAccountCommandHandler,
  SendResetPasswordTokenCommandHandler,
  ChangePasswordByResetTokenCommandHandler,
];
