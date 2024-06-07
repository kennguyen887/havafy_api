import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  MaxLength,
} from 'class-validator';

import { WorkplaceType, JobType, WorkingShedule } from './job';

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

export class TaskAttributes {
  @IsOptional()
  @IsEnum(WorkingShedule)
  workingShedule?: WorkingShedule;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  companyName?: string;

  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  @IsOptional()
  @IsEnum(WorkplaceType)
  workplaceType?: WorkplaceType;

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
