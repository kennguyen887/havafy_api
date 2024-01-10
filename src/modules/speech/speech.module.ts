import { Module } from '@nestjs/common';
import { SpeechController } from './speech.controller';
import { SpeechService } from './speech.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { CommandHandlers } from './commands';

@Module({
  imports: [ConfigModule, CqrsModule],
  controllers: [SpeechController],
  providers: [SpeechService, ...CommandHandlers],
})
export class SpeechModule {}
