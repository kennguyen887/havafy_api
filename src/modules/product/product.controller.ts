import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async list() {
    return {
      message: 'product list',
    };
  }
}
