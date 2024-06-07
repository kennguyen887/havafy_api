import {
  IsString,
  IsOptional,
  IsArray,
  MaxLength,
  IsNotEmpty,
  IsISO8601,
  ValidateIf,
  Validate,
  IsEnum,
} from 'class-validator';
import { IsAfterOrTheSameConstraint } from '../decorators/is-after-or-the-same.decorator';

import { JobType } from './job';

export enum ProfileStatus {
  DRAFT = 'draft',
  FOR_REVIEW = 'for_review',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ProfileType {
  BACKEND_DEVELOPER = 'backend_developer',
  FRONTEND_DEVELOPER = 'fontend_developer',
  FULL_STACK_DEVELOPER = 'full_stack_developer',
  APP_DEVELOPER = 'app_developer',
  QA = 'QA',
  DESIGNER = 'designer',
  MARKETER = 'marketer',
  DEVOPS_ENGINEER = 'devops_engineer',
  DATA_ENGINEER = 'data_engineer',
  AI_DEVELOPER = 'ai_developer',
  AGENCY = 'agency',
  OTHER = 'other',
}

export enum ExpectedRatePer {
  HOUR = 'hour',
  MAN_DAY = 'man_day',
  MONTH = 'month',
}

export class ProfileExperienceItem {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsEnum(JobType)
  employmentType!: JobType;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsISO8601(
    { strict: true },
    { message: 'startDate must be in YYYY-MM-DD format' },
  )
  @MaxLength(10)
  startDate!: Date;

  @IsOptional()
  @IsISO8601(
    { strict: true },
    { message: 'endDate must be in YYYY-MM-DD format' },
  )
  @MaxLength(10)
  @ValidateIf((obj) => obj.startDate)
  @Validate(IsAfterOrTheSameConstraint, ['startDate'])
  endDate?: Date;
}

export class ProfileAttributes {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  skills?: string[];
}
