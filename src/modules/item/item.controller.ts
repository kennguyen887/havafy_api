import {
  Query,
  Controller,
  Get,
  Post,
  Put,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetItemListQueryDto, CreateItemReqDto, UpdateItemReqDto } from './dto';
import { GetJwtUserPayloadDto } from '../user/dto';
import { GetItemListQuery, GetItemDetailQuery } from './queries';
import {
  CreateItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  LinkItemCommand,
} from './commands';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';
import { CaptchaService } from '../../global/services/mail/captcha.service';
import { IdUUIDParams } from 'src/global/utils';

@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly captchaService: CaptchaService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: GetItemListQueryDto,
    @Request() { user }: GetJwtUserPayloadDto,
  ) {
    return this.queryBus.execute(new GetItemListQuery(user.id, query));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getDetail(
    @Param() params: IdUUIDParams,
    @Request() { user }: GetJwtUserPayloadDto,
  ) {
    return this.queryBus.execute(new GetItemDetailQuery(user.id, params.id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateItem(
    @Param() params: IdUUIDParams,
    @Request() req: GetJwtUserPayloadDto,
    @Body() data: UpdateItemReqDto,
  ) {
    const { user } = req;
    return this.commandBus.execute(
      new UpdateItemCommand(params.id, { ...data, userId: user.id }),
    );
  }

  @Put(':id/link')
  @UseGuards(JwtAuthGuard)
  async linkItem(
    @Param() params: IdUUIDParams,
    @Request() req: GetJwtUserPayloadDto,
  ) {
    const { user } = req;
    return this.commandBus.execute(new LinkItemCommand(params.id, user.id));
  }

  @Post()
  async createItem(@Body() data: CreateItemReqDto) {
    const response = await this.captchaService.verifyRecaptcha(data.token);

    if (!response.data.success && response.data.score < 0.5) {
      throw new HttpException('Token is invalid.', HttpStatus.UNAUTHORIZED);
    }

    return this.commandBus.execute(new CreateItemCommand(null, data));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Request() req: GetJwtUserPayloadDto,
    @Param() params: IdUUIDParams,
  ) {
    const { user } = req;
    return this.commandBus.execute(new DeleteItemCommand(user.id, params.id));
  }
}
