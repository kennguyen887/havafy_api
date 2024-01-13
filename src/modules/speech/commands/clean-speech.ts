import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AwsS3 } from '../../../services/app-config/configuration';
import * as dayjs from 'dayjs';
import {
  ListObjectsCommand,
  S3Client,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

export class CleanSpeechCommand {
  constructor(public readonly hours?: number) {}
}

@CommandHandler(CleanSpeechCommand)
export class CleanSpeechCommandHandler
  implements ICommandHandler<CleanSpeechCommand>
{
  private readonly awsS3: AwsS3;

  constructor(private readonly configService: ConfigService) {
    this.awsS3 = this.configService.get<AwsS3>('awsS3') as AwsS3;
  }

  async execute(command: CleanSpeechCommand): Promise<void> {
    const { hours = 1 } = command;
    const BUCKET_NAME = 'havafycom';
    const FOLDER_PATH = 'text-to-speech';
    // create a file on S3
    const credentials = {
      accessKeyId: this.awsS3.accessKeyId,
      secretAccessKey: this.awsS3.secretAccessKey,
    };

    const s3Client = new S3Client({
      region: this.awsS3.region,
      credentials,
    });

    try {
      // List objects in the bucket
      const listObjectsParams = { Bucket: BUCKET_NAME, Prefix: FOLDER_PATH };
      const { Contents } = await s3Client.send(
        new ListObjectsCommand(listObjectsParams),
      );
      if (!Contents) {
        return;
      }
      // Iterate through objects and delete those created x hours ago
      console.log(
        `[AWS S3 - ${FOLDER_PATH}] Total of file is`,
        Contents.length,
      );
      await Promise.all(
        Contents.map((obj) => {
          const lastModified = obj.LastModified;
          if (dayjs(lastModified).isBefore(dayjs().subtract(hours, 'hour'))) {
            const deleteObjectParams = { Bucket: BUCKET_NAME, Key: obj.Key };
            console.log(`AWS S3: Deleted file ${obj.Key}`);
            return s3Client.send(new DeleteObjectCommand(deleteObjectParams));
          }
        }),
      );
    } catch (error) {
      console.error('Error on the AWS S3 Cleanner:', error);
    }
  }
}
