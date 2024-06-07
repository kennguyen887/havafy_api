import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProfileDetailDto } from '../dto';
import { ProfileService } from '../profile.service';
import { plainToInstance } from 'class-transformer';
import { HttpStatus, HttpException } from '@nestjs/common';

export class GetProfileDetailQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetProfileDetailQuery)
export class GetProfileDetailHandler
  implements IQueryHandler<GetProfileDetailQuery>
{
  constructor(private readonly profileService: ProfileService) {}

  async execute(query: GetProfileDetailQuery): Promise<GetProfileDetailDto> {
    const { userId } = query;
    const profile = await this.profileService.getProfileByUser(userId);

    if (!profile) {
      throw new HttpException('Profile not found.', HttpStatus.BAD_REQUEST);
    }

    return plainToInstance(GetProfileDetailDto, profile);
  }
}
