import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  MaxLength,
} from 'class-validator';

export enum TaskStatus {
  DRAFT = 'draft',
  FOR_REVIEW = 'for_review',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum DoneType {
  FLEXIABLE = 'flexiable',
  BEFORE_DATE = 'before_date',
  ON_DATE = 'on_date',
}

export enum TaskCurrency {
  USD = 'USD',
  VND = 'VND',
  SGD = 'SGD',
}

export enum TaskJobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  TEMPORARY = 'temporary',
  OTHER = 'other',
  VOLUNTEER = 'volunteer',
  INTERNSHIP = 'internship',
}

export enum TaskWorkplaceType {
  ON_SITE = 'on-site',
  HYBRID = 'hybrid',
  REMOTE = 'remote',
}

export enum TaskWorkingShedule {
  MON_TO_FRI = 'mon-to-fri',
  MON_TO_SAT = 'mon-to-sat',
  FULL_WEEK = 'full-week',
}

export class TaskAttributes {
  @IsOptional()
  @IsEnum(TaskWorkingShedule)
  workingShedule?: TaskWorkingShedule;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  companyName?: string;

  @IsOptional()
  @IsEnum(TaskJobType)
  jobType?: TaskJobType;

  @IsOptional()
  @IsEnum(TaskWorkplaceType)
  workplaceType?: TaskWorkplaceType;

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
