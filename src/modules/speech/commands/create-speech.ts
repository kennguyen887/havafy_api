import { HttpStatus, HttpException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../../../global/services/mail/mail.service';
import { GCloud } from '../../../services/app-config/configuration';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import TextToSpeech from '@google-cloud/text-to-speech';

export class CreateSpeechCommand {
  constructor(public readonly data: any) {}
}

@CommandHandler(CreateSpeechCommand)
export class CreateSpeechCommandHandler
  implements ICommandHandler<CreateSpeechCommand>
{
  private readonly gcloud: GCloud;

  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {
    this.gcloud = this.configService.get<GCloud>('gcloud') as GCloud;
  }

  async execute(command: CreateSpeechCommand): Promise<void> {
    // Creates a client
    // const speechClient = new TextToSpeech.TextToSpeechClient({
    //   credentials: {
    //     client_email: this.gcloud.client_email,
    //     private_key: this.gcloud.private_key,
    //     universe_domain: 'googleapis.com',
    //   },
    // });

    // create a file on S3
    const credentials = {
      accessKeyId: 'AKIARBOPHZ6DQLDIV53V',
      secretAccessKey: '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',
    };

    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/s3clientconfig.html
    const client = new S3Client({
      region: 'ap-southeast-1',
      credentials,
    });

    try {
      const response = await client.send(
        new PutObjectCommand({
          Bucket: 'havafycom',
          Key: 'hello-s3.txt',
          Body: 'Hello S3!',
        }),
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
}
