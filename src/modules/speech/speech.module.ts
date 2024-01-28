import { Module, forwardRef } from '@nestjs/common';
import { SpeechController } from './speech.controller';
import { SpeechService } from './speech.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { CommandHandlers } from './commands';
import { ProductUsageModule } from '../product-usage/product-usage.module';

@Module({
  imports: [ConfigModule, CqrsModule, forwardRef(() => ProductUsageModule)],
  controllers: [SpeechController],
  providers: [SpeechService, ...CommandHandlers],
})
export class SpeechModule {}
