import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemListItemDto } from '../dto';
import { ItemService } from '../item.service';

export class GetItemDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetItemDetailQuery)
export class GetItemDetailHandler implements IQueryHandler<GetItemDetailQuery> {
  constructor(private readonly itemService: ItemService) {}

  async execute(query: GetItemDetailQuery): Promise<GetItemListItemDto> {
    const { id } = query;
    return this.itemService.getItem(id);
  }
}
