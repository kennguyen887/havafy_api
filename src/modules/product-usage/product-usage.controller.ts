import { Query, Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetProductUsageListQuery } from './queries';

@ApiTags('product-usage')
@Controller('product-usage')
export class ProductUsageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Query() query: any) {
    return this.queryBus.execute(new GetProductUsageListQuery(query));
  }
}
