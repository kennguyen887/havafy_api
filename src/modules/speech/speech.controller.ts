import { Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateSpeechCommand } from './commands';

@ApiTags('speech')
@Controller('speech')
export class SpeechController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async list() {
    return this.commandBus.execute(new CreateSpeechCommand({}));
  }
}
