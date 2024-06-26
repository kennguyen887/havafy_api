import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemListResponseDto, GetItemListQueryDto } from '../dto';
import { ItemService } from '../item.service';

export class GetItemListQuery {
  constructor(
    public readonly userId: string,
    public readonly parameters: GetItemListQueryDto,
  ) {}
}

@QueryHandler(GetItemListQuery)
export class GetItemListQueryHandler
  implements IQueryHandler<GetItemListQuery>
{
  constructor(private readonly itemService: ItemService) {}

  async execute(query: GetItemListQuery): Promise<GetItemListResponseDto> {
    const { userId, parameters } = query;
    return this.itemService.getList(userId, parameters);
  }
}
