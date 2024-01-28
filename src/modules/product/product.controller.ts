import {
  Query,
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetProductListQueryDto, CreateProductReqDto } from './dto';
import { GetJwtUserPayloadDto } from '../user/dto';
import { GetProductListQuery } from './queries';
import { CreateProductCommand } from './commands';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';

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

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Request() req: GetJwtUserPayloadDto,
    @Body() data: CreateProductReqDto,
  ) {
    const { user } = req;
    return this.commandBus.execute(new CreateProductCommand(user.id, data));
  }
}
