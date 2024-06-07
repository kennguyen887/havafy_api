import { IsString, IsOptional, IsArray, MaxLength, IsNotEmpty } from 'class-validator';

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
  @IsString()
  employmentType!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  skills?: string[];
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
