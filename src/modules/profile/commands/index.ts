import { CreateProfileCommandHandler } from './create-profile';
import { DeleteProfileCommandHandler } from './delete-profile';
import { UpdateProfileCommandHandler } from './update-profile';

export * from './create-profile';
export * from './update-profile';
export * from './delete-profile';

export const CommandHandlers = [
  CreateProfileCommandHandler,
  DeleteProfileCommandHandler,
  UpdateProfileCommandHandler,
];
