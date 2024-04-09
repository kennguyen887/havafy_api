import { Query, Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetMediaListQueryDto } from './dto';
import { GetMediaListQuery } from './queries';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@Query() query: GetMediaListQueryDto) {
    return this.queryBus.execute(new GetMediaListQuery(query));
  }
}
