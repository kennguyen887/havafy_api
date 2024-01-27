import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductUsageService } from '../product-usage.service';

export class GetProductUsageListQuery {
  constructor(public readonly parameters: any) {}
}

@QueryHandler(GetProductUsageListQuery)
export class GetProductUsageListQueryHandler
  implements IQueryHandler<GetProductUsageListQuery>
{
  constructor(private readonly productUsageService: ProductUsageService) {}

  async execute(query: GetProductUsageListQuery): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { parameters } = query;
  }
}
