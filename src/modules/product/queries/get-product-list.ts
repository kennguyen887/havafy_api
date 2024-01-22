import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {
  GetProductListResponseDto,
  GetProductListQueryDto,
  GetProductListItemDto,
} from '../dto';
import { ProductService } from '../product.service';

export class GetProductListQuery {
  constructor(public readonly parameters: GetProductListQueryDto) {}
}

@QueryHandler(GetProductListQuery)
export class GetProductListQueryHandler
  implements IQueryHandler<GetProductListQuery>
{
  constructor(private readonly productService: ProductService) {}

  async execute(
    query: GetProductListQuery,
  ): Promise<GetProductListResponseDto> {
    const { parameters } = query;

    if (!parameters.skuList) {
      return { data: [] };
    }

    const products = await this.productService.getProducts(parameters.skuList);
    return {
      data: products.map((product) => {
        return plainToInstance(GetProductListItemDto, product, {
          excludeExtraneousValues: true,
        });
      }),
    };
  }
}
