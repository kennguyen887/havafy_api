import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemListItemDto } from '../dto';
import { ItemService } from '../item.service';

export class GetItemDetailQuery {
  constructor(public readonly userId: string, public readonly id: string) {}
}

@QueryHandler(GetItemDetailQuery)
export class GetItemDetailHandler implements IQueryHandler<GetItemDetailQuery> {
  constructor(private readonly itemService: ItemService) {}

  async execute(query: GetItemDetailQuery): Promise<GetItemListItemDto> {
    const { userId, id } = query;
    return this.itemService.getItem(userId, id);
  }
}
