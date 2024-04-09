import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetMediaListResponseDto, GetMediaListQueryDto } from '../dto';
import { MediaService } from '../media.service';

export class GetMediaListQuery {
  constructor(public readonly parameters: GetMediaListQueryDto) {}
}

@QueryHandler(GetMediaListQuery)
export class GetMediaListQueryHandler
  implements IQueryHandler<GetMediaListQuery>
{
  constructor(private readonly productService: MediaService) {}

  async execute(query: GetMediaListQuery): Promise<GetMediaListResponseDto> {
    const { parameters } = query;
    return plainToInstance(GetMediaListResponseDto, parameters);
  }
}
