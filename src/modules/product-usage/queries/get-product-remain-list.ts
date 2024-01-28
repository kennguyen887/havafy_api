import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductUsageService } from '../product-usage.service';
import {
  GetProductUserRemainQueryDto,
  GetProductRemainResponseDto,
} from '../dto';

export class GetProductRemainListQuery {
  constructor(
    public readonly userId: string,

    public readonly parameters: GetProductUserRemainQueryDto,
  ) {}
}

@QueryHandler(GetProductRemainListQuery)
export class GetProductRemainListQueryHandler
  implements IQueryHandler<GetProductRemainListQuery>
{
  constructor(private readonly productUsageService: ProductUsageService) {}

  async execute(
    query: GetProductRemainListQuery,
  ): Promise<GetProductRemainResponseDto> {
    const {
      userId,
      parameters: { skuList },
    } = query;
    const data = await this.productUsageService.getUserRemains(userId, skuList);

    return {
      data,
    };
  }
}
