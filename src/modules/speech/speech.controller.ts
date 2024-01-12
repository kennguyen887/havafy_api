import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateSpeechCommand } from './commands';
import { CreateSpeechRequestDto } from './dto';

@ApiTags('speech')
@Controller('speech')
export class SpeechController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async list(@Body() data: CreateSpeechRequestDto) {
    return this.commandBus.execute(new CreateSpeechCommand(data));
  }
}
