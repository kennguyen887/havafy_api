import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProfileDetailDto } from '../dto';
import { ProfileService } from '../profile.service';
import { plainToInstance } from 'class-transformer';
import { HttpStatus, HttpException } from '@nestjs/common';

export class GetProfileDetailByHirerQuery {
  constructor(public readonly id: string, public readonly userId: string) {}
}

@QueryHandler(GetProfileDetailByHirerQuery)
export class GetProfileDetailByHirerQueryHandler
  implements IQueryHandler<GetProfileDetailByHirerQuery>
{
  constructor(private readonly profileService: ProfileService) {}

  async execute(
    query: GetProfileDetailByHirerQuery,
  ): Promise<GetProfileDetailDto> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, userId } = query;
    const profile = await this.profileService.getProfile(id);

    if (!profile) {
      throw new HttpException('Profile not found.', HttpStatus.BAD_REQUEST);
    }

    return plainToInstance(GetProfileDetailDto, profile);
  }
}
