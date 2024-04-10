import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMediaListResponseDto, GetMediaListQueryDto } from '../dto';
import { MediaService } from '../media.service';

export class GetMediaListQuery {
  constructor(
    public readonly userId: string,
    public readonly parameters: GetMediaListQueryDto,
  ) {}
}

@QueryHandler(GetMediaListQuery)
export class GetMediaListQueryHandler
  implements IQueryHandler<GetMediaListQuery>
{
  constructor(private readonly mediaService: MediaService) {}

  async execute(query: GetMediaListQuery): Promise<GetMediaListResponseDto> {
    return this.mediaService.getMediaList(query.userId, query.parameters);
  }
}
