import { Process, Processor } from '@nestjs/bull';
import { CommandBus } from '@nestjs/cqrs';
import { Job } from 'bull';
import { QUEUE_JOB_NAMES, HAVAFY_QUEUE } from '../../../global/models';
import { CleanSpeechCommand } from '../../speech/commands';

/* istanbul ignore next */
@Processor(HAVAFY_QUEUE)
export class C4BQueueProcessors {
  constructor(private readonly commandBus: CommandBus) {}

  @Process({ name: QUEUE_JOB_NAMES.TEXT_TO_SPEECH_CLEANUP })
  async sendNotificationEmail(job: Job<any>): Promise<void> {
    console.log('Start Queues: Cleanning for Text-To-Speech .', job.data);
    return this.commandBus.execute(new CleanSpeechCommand(2));
  }
}
