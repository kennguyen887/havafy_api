import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProfileService } from '../profile.service';

export class DeleteProfileCommand {
  constructor(
    public readonly userId: string,
    public readonly profileId: string,
  ) {}
}

@CommandHandler(DeleteProfileCommand)
export class DeleteProfileCommandHandler
  implements ICommandHandler<DeleteProfileCommand>
{
  constructor(private readonly profileService: ProfileService) {}

  async execute(command: DeleteProfileCommand): Promise<void> {
    const { profileId, userId } = command;

    return this.profileService.deleteProfile(userId, profileId);
  }
}
