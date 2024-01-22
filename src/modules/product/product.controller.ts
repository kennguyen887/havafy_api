import { Query, Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetProductListQueryDto } from './dto';
import { GetProductListQuery } from './queries';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Query() query: GetProductListQueryDto) {
    return this.queryBus.execute(new GetProductListQuery(query));
  }
}
