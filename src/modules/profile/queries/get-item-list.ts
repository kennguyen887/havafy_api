import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProfileListResponseDto, GetProfileListQueryDto } from '../dto';
import { ProfileService } from '../profile.service';

export class GetProfileListQuery {
  constructor(
    public readonly userId: string,
    public readonly parameters: GetProfileListQueryDto,
  ) {}
}

@QueryHandler(GetProfileListQuery)
export class GetProfileListQueryHandler
  implements IQueryHandler<GetProfileListQuery>
{
  constructor(private readonly profileService: ProfileService) {}

  async execute(query: GetProfileListQuery): Promise<GetProfileListResponseDto> {
    const { userId, parameters } = query;
    return this.profileService.getList(userId, parameters);
  }
}
