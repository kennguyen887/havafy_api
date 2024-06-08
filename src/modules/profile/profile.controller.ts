import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileReqDto, UpdateProfileReqDto } from './dto';
import { GetJwtUserPayloadDto } from '../user/dto';
import { GetProfileDetailQuery, GetProfileDetailByHirerQuery } from './queries';
import {
  CreateProfileCommand,
  DeleteProfileCommand,
  UpdateProfileCommand,
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
  async getDetail(@Request() { user }: GetJwtUserPayloadDto) {
    return this.queryBus.execute(new GetProfileDetailQuery(user.id));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getDetailByHirer(@Request() { user }: GetJwtUserPayloadDto) {
    return this.queryBus.execute(
      new GetProfileDetailByHirerQuery(user.id, user.id),
    );
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

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Body() data: CreateProfileReqDto,
    @Request() { user }: GetJwtUserPayloadDto,
  ) {
    return this.commandBus.execute(new CreateProfileCommand(user.id, data));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Request() req: GetJwtUserPayloadDto,
    @Param() params: IdUUIDParams,
  ) {
    const { user } = req;
    return this.commandBus.execute(
      new DeleteProfileCommand(user.id, params.id),
    );
  }
}
