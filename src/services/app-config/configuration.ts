import { BullModuleOptions } from '@nestjs/bull';

export const getConfig = (): AppConfig => {
  return {
    port: parseInt(process.env.PORT as string, 10) || 3000,
    jwtSecret: process.env.JWT_SECRET as string,
    logLevel: process.env.LOG_LEVEL || 'info',
    storefrontBaseUrl: process.env.STOREFRONT_BASE_URL || '',
    database: {
      host: process.env.DB_HOST as string,
      type: process.env.DB_TYPE as string,
      port: parseInt(process.env.DB_PORT as string, 10) || 5432,
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      dbName: process.env.DB_NAME as string,
    },
    cache: {
      host: process.env.REDIS_HOST as string,
      port: parseInt(process.env.REDIS_PORT as string, 10) || 6379,
      password: process.env.REDIS_PASSWORD as string,
    },
    bull: {
      redis: {
        host: process.env.REDIS_HOST as string,
        port: parseInt(process.env.REDIS_PORT as string, 10) || 6379,
        username: 'default',
        password: process.env.REDIS_PASSWORD as string,
        db: parseInt(process.env.REDIS_DB || '0', 10),
        tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
      },
    },
    mail: {
      from: process.env.MAIL_FROM as string,
      transportOptions: {
        host: process.env.MAIL_HOST as string,
        port: parseInt(process.env.MAIL_PORT as string, 10),
        auth: {
          user: process.env.MAIL_AUTH_USER as string,
          pass: process.env.MAIL_AUTH_PASS as string,
        },
      },
    },
    recaptcha: {
      secret_key: process.env.RECAPTHA_SECRET_KEY as string,
    },
    gcloud: {
      client_id: process.env.GCOUD_CLIENT_ID as string,
      client_email: process.env.GCLOUD_CLIENT_EMAIL as string,
      private_key: process.env.GCLOUD_PRIVATE_KEY as string,
    },
    awsS3: {
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
      region: process.env.AWS_S3_REGION as string,
    },
  };
};

export interface AppConfig {
  port: number;
  jwtSecret: string;
  logLevel: string;
  storefrontBaseUrl: string;
  database: DbConfig;
  cache: CacheConfig;
  mail: MailConfig;
  recaptcha: ReCaptcha;
  gcloud: GCloud;
  awsS3: AwsS3;
  bull: BullModuleOptions;
}

export interface DbConfig {
  host: string;
  port: number;
  type: string;
  user: string;
  password: string;
  dbName: string;
}

export interface CacheConfig {
  host: string;
  port: number;
  password: string;
}

export interface MailConfig {
  from: string;
  transportOptions: {
    host: string;
    port: number;
    auth: {
      user: string;
      pass: string;
    };
  };
}

export interface ReCaptcha {
  secret_key: string;
}

export interface GCloud {
  client_id: string;
  client_email: string;
  private_key: string;
}

export interface AwsS3 {
  secretAccessKey: string;
  accessKeyId: string;
  region: string;
}
