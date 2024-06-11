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
  Max,
  IsInt,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
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
  @MaxLength(200)
  title!: string;

  @IsNotEmpty()
  @IsEnum(JobType)
  employmentType!: JobType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  productName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
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

export class ProfileCertificationItem {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
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

export class ProfileProjectItem {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
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

export class ProfileSkillItem {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name!: string;

  @IsOptional()
  @IsInt()
  @Max(5)
  level?: number;
}

export class ProfileLanguageItem {
  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  languageCode!: string;

  @IsNotEmpty()
  @IsInt()
  @Max(5)
  level!: number;
}

export class ProfileExperience {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => ProfileExperienceItem)
  data!: ProfileExperienceItem[];
}

export class ProfileCertifications {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => ProfileExperienceItem)
  data!: ProfileCertificationItem[];
}

export class ProfileProjects {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => ProfileProjectItem)
  data!: ProfileProjectItem[];
}

export class ProfileSkills {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => ProfileSkillItem)
  data!: ProfileSkillItem[];
}

export class ProfileLanguages {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => ProfileLanguageItem)
  data!: ProfileLanguageItem[];
}

export class ProfileContact {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  linkedinUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  bookingUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  githubUrl?: string;
}

export class ProfileAttributes {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  skills?: string[];
}
