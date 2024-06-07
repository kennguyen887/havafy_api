import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateProfileResponseDto } from '../dto';
import { ProfileService } from '../profile.service';

export class LinkProfileCommand {
  constructor(public readonly id: string, public readonly userId: string) {}
}

@CommandHandler(LinkProfileCommand)
export class LinkProfileCommandHandler
  implements ICommandHandler<LinkProfileCommand>
{
  constructor(private readonly profileService: ProfileService) {}

  async execute(command: LinkProfileCommand): Promise<CreateProfileResponseDto> {
    const { id, userId } = command;

    return this.profileService.linkProfile(id, userId);
  }
}
