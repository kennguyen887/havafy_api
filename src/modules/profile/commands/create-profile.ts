import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateProfileReqDto, CreateProfileResponseDto } from '../dto';
import { ProfileService } from '../profile.service';
import { Nullable } from 'src/global/utils/types';

export class CreateProfileCommand {
  constructor(
    public readonly userId: Nullable<string>,
    public readonly data: CreateProfileReqDto,
  ) {}
}

@CommandHandler(CreateProfileCommand)
export class CreateProfileCommandHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(private readonly profileService: ProfileService) {}

  async execute(command: CreateProfileCommand): Promise<CreateProfileResponseDto> {
    const { data, userId } = command;
    return this.profileService.createProfile(userId, data);
  }
}
