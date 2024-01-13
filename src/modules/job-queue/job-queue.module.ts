import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Queue } from 'bull';
import {
  QUEUE_JOB_NAMES,
  DEFAULT_QUEUE_JOB_AGE,
  DEFAULT_QUEUE_JOB_COUNT,
  HAVAFY_QUEUE,
} from '../../global/models';
import { Processors } from './processors';

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueue({
      name: HAVAFY_QUEUE,
    }),
  ],
  providers: [...Processors],
  exports: [BullModule],
})
export class JobQueueModule implements OnModuleInit {
  constructor(
    @InjectQueue(HAVAFY_QUEUE)
    private readonly c4bQueue: Queue,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.c4bQueue.add(
      QUEUE_JOB_NAMES.TEXT_TO_SPEECH_CLEANUP,
      { payload: {} },
      {
        removeOnComplete: {
          age: DEFAULT_QUEUE_JOB_AGE,
          count: DEFAULT_QUEUE_JOB_COUNT,
        },
        repeat: {
          cron: '0 * * * *',
        },
      },
    );
  }
}
