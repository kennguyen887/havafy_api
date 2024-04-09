import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity, TaskEntity, CommentEntity } from 'src/global/entities';
import { CreateMediaDto } from './dto';
import { MediaStatus, FeatureType } from 'src/global/models';
import { getFileExtension } from 'src/global/utils';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CaptchaService } from 'src/global/services/mail/captcha.service';
import { GCloud, AwsS3 } from 'src/services/app-config/configuration';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class MediaService {
  private readonly gcloud: GCloud;
  private readonly awsS3: AwsS3;
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
    const s3Bucket = this.awsS3.s3Bucket;
    const filePath = `media/${uuidV4()}.${getFileExtension(fileName)}`;
    const fileUrl = `https://${s3Bucket}.s3.${this.awsS3.region}.amazonaws.com/${filePath}`;

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
      await client.send(
        new PutObjectCommand({
          Bucket: s3Bucket,
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

  async deleteMedia(userId: string, mediaId: string): Promise<void> {
    await this.mediaRepository.delete({
      id: mediaId,
      userId,
    });
  }
}
