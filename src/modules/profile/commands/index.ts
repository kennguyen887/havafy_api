import { CreateProfileCommandHandler } from './create-profile';
import { DeleteProfileCommandHandler } from './delete-profile';
import { UpdateProfileCommandHandler } from './update-profile';
import { LinkProfileCommandHandler } from './link-profile';

export * from './create-profile';
export * from './update-profile';
export * from './delete-profile';
export * from './link-profile';

export const CommandHandlers = [
  CreateProfileCommandHandler,
  DeleteProfileCommandHandler,
  UpdateProfileCommandHandler,
  LinkProfileCommandHandler,
];
