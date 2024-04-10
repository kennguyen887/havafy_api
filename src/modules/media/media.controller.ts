import {
  Query,
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  HttpStatus,
  HttpCode,
  UploadedFile,
  UseInterceptors,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipe,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetMediaListQueryDto, CreateMediaReqDto } from './dto';
import { GetJwtUserPayloadDto } from '../user/dto';
import { GetMediaListQuery } from './queries';
import { CreateMediaCommand, DeleteMediaCommand } from './commands';
import { IdUUIDParams } from 'src/global/utils';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@Query() query: GetMediaListQueryDto) {
    return this.queryBus.execute(new GetMediaListQuery(query));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Request() req: GetJwtUserPayloadDto,
    @Param() params: IdUUIDParams,
  ) {
    const { user } = req;
    return this.commandBus.execute(new DeleteMediaCommand(user.id, params.id));
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createMedia(
    @Request() req: GetJwtUserPayloadDto,
    @Body() data: CreateMediaReqDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1000000 }), // 2 MB
          new FileTypeValidator({
            fileType:
              /image\/(jpg|woff|svg+xml|jpeg|png)|audio\/mpeg|application\/(msword|pdf|zip)|video\/mp4/g,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const { user } = req;
    const fileName = file.originalname;
    return this.commandBus.execute(
      new CreateMediaCommand({
        ...data,
        fileName,
        title: fileName,
        userId: user.id,
        content: file.buffer.toString('base64'),
      }),
    );
  }
}
