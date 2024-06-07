import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProfileListProfileDto } from '../dto';
import { ProfileService } from '../profile.service';

export class GetProfileDetailQuery {
  constructor(public readonly userId: string, public readonly id: string) {}
}

@QueryHandler(GetProfileDetailQuery)
export class GetProfileDetailHandler implements IQueryHandler<GetProfileDetailQuery> {
  constructor(private readonly profileService: ProfileService) {}

  async execute(query: GetProfileDetailQuery): Promise<GetProfileListProfileDto> {
    const { userId, id } = query;
    return this.profileService.getProfile(userId, id);
  }
}
