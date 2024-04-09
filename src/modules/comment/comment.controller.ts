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
import { GetCommentListQueryDto, CreateCommentReqDto } from './dto';
import { GetJwtUserPayloadDto } from '../user/dto';
import { GetCommentListQuery } from './queries';
import { CreateCommentCommand } from './commands';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Query() query: GetCommentListQueryDto) {
    return this.queryBus.execute(new GetCommentListQuery(query));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Request() req: GetJwtUserPayloadDto,
    @Body() data: CreateCommentReqDto,
  ) {
    const { user } = req;
    return this.commandBus.execute(new CreateCommentCommand(user.id, data));
  }
}
