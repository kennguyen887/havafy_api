import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity, TaskEntity, CommentEntity } from 'src/global/entities';
import { CreateMediaDto } from './dto';
import { MediaStatus, FeatureType } from 'src/global/models';
import { getFileExtension } from 'src/global/utils';
import { ConfigService } from '@nestjs/config';
import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { CaptchaService } from 'src/global/services/mail/captcha.service';
import { GCloud, AwsS3 } from 'src/services/app-config/configuration';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class MediaService {
  private readonly gcloud: GCloud;
  private readonly awsS3: AwsS3;
  private readonly awsS3Folder: string;
  private readonly s3Client: S3Client;
  private readonly s3RootUrl: string;
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    private readonly captchaService: CaptchaService,
    private readonly configService: ConfigService,
  ) {
    this.gcloud = this.configService.get<GCloud>('gcloud') as GCloud;
    this.awsS3 = this.configService.get<AwsS3>('awsS3') as AwsS3;
    this.awsS3Folder = 'media';
    this.s3Client = this.getS3Client();
    this.s3RootUrl = this.getS3RootUrl();
  }

  async createMedia(data: CreateMediaDto): Promise<void> {
    const { featureType, featureId, fileName, userId, content } = data;
    let feature = null;

    if (featureType === FeatureType.TASK) {
      feature = await this.taskRepository.findOneBy({ id: featureId });
    }

    if (featureType === FeatureType.COMMENT) {
      feature = await this.commentRepository.findOneBy({ id: featureId });
    }

    if (!feature) {
      throw new HttpException('Feature is not found', HttpStatus.BAD_REQUEST);
    }
    const filePath = `${this.awsS3Folder}/${uuidV4()}.${getFileExtension(
      fileName,
    )}`;
    const fileUrl = `${this.s3RootUrl}/${filePath}`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.awsS3.s3Bucket,
          Key: filePath,
          Body: Buffer.from(content, 'base64'),
          ACL: 'public-read',
        }),
      );
    } catch (err) {
      console.error('Cannot put file to AWS S3', err);
      throw new HttpException(
        'Cannot create the media file.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.mediaRepository.save({
      ...data,
      status: MediaStatus.ACTIVE,
      featureId: feature.id,
      url: fileUrl,
      userId,
    });
  }

  private getS3RootUrl(): string {
    return `https://${this.awsS3.s3Bucket}.s3.${this.awsS3.region}.amazonaws.com`;
  }

  private getS3Client(): S3Client {
    // create a file on S3
    const credentials = {
      accessKeyId: this.awsS3.accessKeyId,
      secretAccessKey: this.awsS3.secretAccessKey,
    };

    const client = new S3Client({
      region: this.awsS3.region,
      credentials,
    });
    return client;
  }

  async deleteMedia(userId: string, mediaId: string): Promise<void> {
    const media = await this.mediaRepository.findOneBy({
      id: mediaId,
      userId,
    });

    if (!media) {
      return;
    }

    try {
      const fileKey = media.url.replace(`${this.s3RootUrl}/`, '');
      const deleteObjectParams = { Bucket: this.awsS3.s3Bucket, Key: fileKey };
      console.log(`AWS S3: Deletìng file ${fileKey}`, deleteObjectParams);
      await this.s3Client.send(new DeleteObjectCommand(deleteObjectParams));
    } catch (error) {
      console.error('Error on the AWS S3 Remover:', error);
    }

    await this.mediaRepository.delete({
      id: mediaId,
      userId,
    });
  }
}
