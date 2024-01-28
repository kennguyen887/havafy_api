import { Query, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetProductRemainListQuery } from './queries';
import { GetProductUserRemainQueryDto } from './dto';
import { GetJwtUserPayloadDto } from '../user/dto';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';

@ApiTags('product-usage')
@Controller('product-usage')
export class ProductUsageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(
    @Request() req: GetJwtUserPayloadDto,
    @Query() query: GetProductUserRemainQueryDto,
  ) {
    return this.queryBus.execute(
      new GetProductRemainListQuery(req.user.id, query),
    );
  }
}
