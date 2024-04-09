import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {
  ClientConfiguration,
  GetObjectOutput,
  HeadObjectOutput,
} from 'aws-sdk/clients/s3';
import { Nullable } from 'src/global/utils';
import { v4 as uuidv4 } from 'uuid';

const DURATION = 120 * 60; // 120 minutes

export type SignedUploadUrlDto = {
  bucket: string;
  contentType: string;
  contentLength: number;
  duration?: number;
  key?: string;
  isPublic: boolean;
};

export type SignedDownloadUrlDto = {
  bucket: string;
  key: string;
  duration?: number;
};

export type HeadObjectDto = {
  bucket: string;
  key: string;
};

export type PostSignedUrlResDto = {
  key: string;
  signedUrl: string;
  fields?: Record<string, unknown>;
};

export type PutSignedUrlResDto = {
  key: string;
  signedUrl: string;
};

@Injectable()
export class S3Service {
  private s3: S3;

  constructor(config: ClientConfiguration) {
    const defaultConfig: ClientConfiguration = {
      credentials: {
        accessKeyId: process.env.SERVICE_AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.SERVICE_AWS_SECRET_ACCESS_KEY || '',
      },
      region: process.env.S3_REGION,
    };
    this.s3 = new S3({
      ...defaultConfig,
      ...config,
    });
  }

  async getUploadSignedUrl(
    params: SignedUploadUrlDto,
  ): Promise<PutSignedUrlResDto> {
    const { bucket, contentType, duration = DURATION, key = uuidv4() } = params;

    const signedUrl = await this.s3.getSignedUrlPromise('putObject', {
      Bucket: bucket,
      Key: key,
      Expires: duration,
      ContentType: contentType,
    });

    return {
      key,
      signedUrl,
    };
  }

  async getPresignedPostUrl(
    params: SignedUploadUrlDto,
  ): Promise<PostSignedUrlResDto | null> {
    const {
      bucket,
      contentLength,
      contentType,
      duration = DURATION,
      key = uuidv4(),
      isPublic,
    } = params;

    const fields: Record<string, unknown> = {
      Key: key,
      'Content-Type': contentType,
    };

    if (isPublic) fields.acl = 'public-read';

    return new Promise((resolve) => {
      return this.s3.createPresignedPost(
        {
          Bucket: bucket,
          Expires: duration,
          Conditions: [['content-length-range', 0, contentLength + 100]],
          Fields: fields,
        },
        (err, data) => {
          if (err) return resolve(null);
          return resolve({
            key,
            signedUrl: data.url,
            fields: data.fields,
          });
        },
      );
    });
  }

  async getSignedUrl(params: SignedDownloadUrlDto): Promise<string> {
    const { bucket, key, duration = DURATION } = params;
    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: bucket,
      Expires: duration,
      Key: key,
    });
  }

  async putObject(
    bucket: string,
    key: string,
    body: Buffer,
    contentType: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.s3.putObject(
        {
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: contentType,
        },
        (err) => {
          return err ? reject(err) : resolve();
        },
      );
    });
  }

  async deleteObject(bucket: string, key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject({ Bucket: bucket, Key: key }, (err) => {
        if (!err) return resolve();

        return reject(err);
      });
    });
  }

  async getObjectMetadata(
    params: HeadObjectDto,
  ): Promise<HeadObjectOutput | null> {
    return new Promise((resolve) => {
      this.s3.headObject(
        {
          Bucket: params.bucket,
          Key: params.key,
        },
        (err, metadata) => {
          if (err) {
            return resolve(null);
          }
          return resolve(metadata);
        },
      );
    });
  }

  async getObject(
    bucket: string,
    key: string,
  ): Promise<Nullable<GetObjectOutput>> {
    return new Promise((resolve, reject) => {
      this.s3.getObject({ Bucket: bucket, Key: key }, (err, res) => {
        return err ? reject(err) : resolve(res);
      });
    });
  }
}
