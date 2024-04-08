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
import { GetTaskListQueryDto, CreateTaskReqDto } from './dto';
import { GetJwtUserPayloadDto } from '../user/dto';
import { GetTaskListQuery } from './queries';
import { CreateTaskCommand } from './commands';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';

@ApiTags('product')
@Controller('product')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Query() query: GetTaskListQueryDto) {
    return this.queryBus.execute(new GetTaskListQuery(query));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Request() req: GetJwtUserPayloadDto,
    @Body() data: CreateTaskReqDto,
  ) {
    const { user } = req;
    return this.commandBus.execute(new CreateTaskCommand(user.id, data));
  }
}
