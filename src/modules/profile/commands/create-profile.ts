import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HttpStatus, HttpException } from '@nestjs/common';

import { CreateProfileReqDto, CreateProfileResponseDto } from '../dto';
import { ProfileService } from '../profile.service';

export class CreateProfileCommand {
  constructor(
    public readonly userId: string,
    public readonly data: CreateProfileReqDto,
  ) {}
}

@CommandHandler(CreateProfileCommand)
export class CreateProfileCommandHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(private readonly profileService: ProfileService) {}

  async execute(
    command: CreateProfileCommand,
  ): Promise<CreateProfileResponseDto> {
    const { data, userId } = command;
    const profile = await this.profileService.getProfileByUser(userId);

    if (profile) {
      throw new HttpException(
        'Have an profile already.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.profileService.createProfile(userId, data);
  }
}
