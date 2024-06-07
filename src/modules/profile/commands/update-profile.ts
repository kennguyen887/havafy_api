import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateProfileReqDto, CreateProfileResponseDto } from '../dto';
import { ProfileService } from '../profile.service';

export class UpdateProfileCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateProfileReqDto,
  ) {}
}

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(private readonly profileService: ProfileService) {}

  async execute(command: UpdateProfileCommand): Promise<CreateProfileResponseDto> {
    const { id, data } = command;

    return this.profileService.updateProfile(id, data);
  }
}
