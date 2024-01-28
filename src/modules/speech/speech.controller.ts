import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateSpeechCommand } from './commands';
import { CreateSpeechRequestDto } from './dto';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';
import { GetJwtUserPayloadDto } from '../user/dto';

@ApiTags('speech')
@Controller('speech')
export class SpeechController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async list(
    @Body() data: CreateSpeechRequestDto,
    @Request() req: GetJwtUserPayloadDto,
  ) {
    return this.commandBus.execute(new CreateSpeechCommand(req.user.id, data));
  }
}
