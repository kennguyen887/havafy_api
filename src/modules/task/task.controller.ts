import {
  Query,
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetTaskListQueryDto, CreateTaskReqDto } from './dto';
import { GetJwtUserPayloadDto } from '../user/dto';
import { GetTaskListQuery, GetTaskDetailQuery } from './queries';
import { CreateTaskCommand, DeleteTaskCommand } from './commands';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';
import { IdUUIDParams } from 'src/global/utils';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Query() query: GetTaskListQueryDto) {
    return this.queryBus.execute(new GetTaskListQuery(query));
  }

  @Get(':id')
  async getDetail(@Param() params: IdUUIDParams) {
    return this.queryBus.execute(new GetTaskDetailQuery(params.id));
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Request() req: GetJwtUserPayloadDto,
    @Param() params: IdUUIDParams,
  ) {
    const { user } = req;
    return this.commandBus.execute(new DeleteTaskCommand(user.id, params.id));
  }
}
