import { HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MailService } from '../../../global/services/mail/mail.service';
import { GCloud, AwsS3 } from '../../../services/app-config/configuration';
import { v4 as uuidV4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import TextToSpeech from '@google-cloud/text-to-speech';
import { CreateSpeechRequestDto, CreateSpeechResponsetDto } from '../dto';

export class CreateSpeechCommand {
  constructor(public readonly data: CreateSpeechRequestDto) {}
}

@CommandHandler(CreateSpeechCommand)
export class CreateSpeechCommandHandler
  implements ICommandHandler<CreateSpeechCommand>
{
  private readonly gcloud: GCloud;
  private readonly awsS3: AwsS3;

  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {
    this.gcloud = this.configService.get<GCloud>('gcloud') as GCloud;
    this.awsS3 = this.configService.get<AwsS3>('awsS3') as AwsS3;
  }

  async execute(
    command: CreateSpeechCommand,
  ): Promise<CreateSpeechResponsetDto> {
    const { text, speed = 1, voice, ssmlGender } = command.data;
    const s3Bucket = 'havafycom';
    const filePath = `text-to-speech/${uuidV4()}.mp3`;
    const speechFileUrl = `https://${s3Bucket}.s3.${this.awsS3.region}.amazonaws.com/${filePath}`;

    // Import other required libraries
    // Creates a client
    const speechClient = new TextToSpeech.TextToSpeechClient({
      credentials: {
        client_email: this.gcloud.client_email,
        private_key: this.gcloud.private_key,
        universe_domain: 'googleapis.com',
      },
    });
    // Construct the request
    const voiceCode = voice.split('-');
    const [response] = await speechClient.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: `${voiceCode[0]}-${voiceCode[1]}`,
        name: voice,
        ssmlGender,
      },
      audioConfig: { audioEncoding: 2, speakingRate: speed },
    });

    if (!response || !response.audioContent) {
      console.error('Have a error when synthesize speech', command.data);
      throw new HttpException('Cannot create speech.', HttpStatus.BAD_REQUEST);
    }

    // create a file on S3
    const credentials = {
      accessKeyId: this.awsS3.accessKeyId,
      secretAccessKey: this.awsS3.secretAccessKey,
    };

    const client = new S3Client({
      region: this.awsS3.region,
      credentials,
    });

    try {
      const buffer = Buffer.from(response.audioContent);
      await client.send(
        new PutObjectCommand({
          Bucket: s3Bucket,
          Key: filePath,
          Body: buffer,
          ACL: 'public-read',
        }),
      );
    } catch (err) {
      console.error('Cannot put file to AWS S3', err);
      throw new HttpException('Cannot create speech.', HttpStatus.BAD_REQUEST);
    }
    return {
      speechFileUrl,
    };
  }
}
