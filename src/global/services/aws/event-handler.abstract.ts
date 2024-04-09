import {
  SqsConsumerEvent,
  SqsConsumerEventHandler,
  SqsMessageHandler,
} from '@nestjs-packages/sqs';
import { Logger } from 'winston';
import { parseMessagePayload } from '.';

export abstract class AbstractEventHandler {
  constructor(
    protected readonly logger: Logger,
    private readonly queueName: string,
  ) {}

  abstract execute(payload: unknown): Promise<void>;

  @SqsMessageHandler(false)
  public async handleMessage(message: AWS.SQS.Message): Promise<void> {
    const payload = parseMessagePayload(message.Body || '');

    this.logger.info(`Processing ${this.queueName}`, {
      payload,
    });

    await this.execute(payload);
  }

  @SqsConsumerEventHandler(SqsConsumerEvent.MESSAGE_RECEIVED)
  public onMessageReceived(message: AWS.SQS.Message): void {
    this.logger.info(
      `Start processing message with ${this.queueName} on AWS-SQS.`,
      {
        eventMessage: message,
        event: SqsConsumerEvent.MESSAGE_RECEIVED,
      },
    );
  }

  @SqsConsumerEventHandler(SqsConsumerEvent.MESSAGE_PROCESSED)
  public onMessageProcessed(): void {
    this.logger.info(
      `Finish processing message with ${this.queueName} on AWS-SQS.`,
      {
        event: SqsConsumerEvent.MESSAGE_PROCESSED,
      },
    );
  }

  @SqsConsumerEventHandler(SqsConsumerEvent.PROCESSING_ERROR)
  public onProcessingError(error: Error, message: AWS.SQS.Message): void {
    this.logger.error(
      `Failed to process message with ${this.queueName} on AWS-SQS.`,
      {
        eventMessage: message,
        error: error.message,
        event: SqsConsumerEvent.PROCESSING_ERROR,
      },
    );
  }

  @SqsConsumerEventHandler(SqsConsumerEvent.ERROR)
  public onError(error: Error, message: AWS.SQS.Message): void {
    this.logger.error(
      `Failed to process message with ${this.queueName} on AWS-SQS.`,
      {
        eventMessage: message,
        error: error.message,
        event: SqsConsumerEvent.ERROR,
      },
    );
  }

  @SqsConsumerEventHandler(SqsConsumerEvent.TIMEOUT_ERROR)
  public onTimeoutError(error: Error, message: AWS.SQS.Message): void {
    this.logger.error(
      `Failed to process message with ${this.queueName} on AWS-SQS.`,
      {
        eventMessage: message,
        error: error.message,
        event: SqsConsumerEvent.TIMEOUT_ERROR,
      },
    );
  }
}
