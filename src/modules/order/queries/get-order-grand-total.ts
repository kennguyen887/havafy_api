import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderGrandTotalRequestDto, GetOrderGrandTotalResDto } from '../dto';
import { OrderService } from '../order.service';

import { Nullable } from 'src/global/utils/types';

export class GetOrderGrandTotalQuery {
  constructor(
    public readonly userId: Nullable<string>,
    public readonly data: GetOrderGrandTotalRequestDto,
  ) {}
}

@QueryHandler(GetOrderGrandTotalQuery)
export class GetOrderGrandTotalQueryHandler
  implements IQueryHandler<GetOrderGrandTotalQuery>
{
  constructor(private readonly orderService: OrderService) {}

  async execute(
    query: GetOrderGrandTotalQuery,
  ): Promise<GetOrderGrandTotalResDto> {
    return this.orderService.getProductGrandTotal(query.data);
  }
}
