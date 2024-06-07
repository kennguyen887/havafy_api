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
import { GetProfileListQueryDto, CreateProfileReqDto, UpdateProfileReqDto } from './dto';
import { GetJwtUserPayloadDto } from '../user/dto';
import { GetProfileListQuery, GetProfileDetailQuery } from './queries';
import {
  CreateProfileCommand,
  DeleteProfileCommand,
  UpdateProfileCommand,
  LinkProfileCommand,
} from './commands';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';
import { CaptchaService } from '../../global/services/mail/captcha.service';
import { IdUUIDParams } from 'src/global/utils';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly captchaService: CaptchaService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(
    @Query() query: GetProfileListQueryDto,
    @Request() { user }: GetJwtUserPayloadDto,
  ) {
    return this.queryBus.execute(new GetProfileListQuery(user.id, query));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getDetail(
    @Param() params: IdUUIDParams,
    @Request() { user }: GetJwtUserPayloadDto,
  ) {
    return this.queryBus.execute(new GetProfileDetailQuery(user.id, params.id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Param() params: IdUUIDParams,
    @Request() req: GetJwtUserPayloadDto,
    @Body() data: UpdateProfileReqDto,
  ) {
    const { user } = req;
    return this.commandBus.execute(
      new UpdateProfileCommand(params.id, { ...data, userId: user.id }),
    );
  }

  @Put(':id/link')
  @UseGuards(JwtAuthGuard)
  async linkProfile(
    @Param() params: IdUUIDParams,
    @Request() req: GetJwtUserPayloadDto,
  ) {
    const { user } = req;
    return this.commandBus.execute(new LinkProfileCommand(params.id, user.id));
  }

  @Post()
  async createProfile(@Body() data: CreateProfileReqDto) {
    const response = await this.captchaService.verifyRecaptcha(data.token);

    if (!response.data.success && response.data.score < 0.5) {
      throw new HttpException('Token is invalid.', HttpStatus.UNAUTHORIZED);
    }

    return this.commandBus.execute(new CreateProfileCommand(null, data));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Request() req: GetJwtUserPayloadDto,
    @Param() params: IdUUIDParams,
  ) {
    const { user } = req;
    return this.commandBus.execute(new DeleteProfileCommand(user.id, params.id));
  }
}
