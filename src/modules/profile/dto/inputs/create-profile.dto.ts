import {
  IsString,
  MaxLength,
  IsEnum,
  IsOptional,
  MinLength,
  IsObject,
  ValidateNested,
  IsNumber,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  Max,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  ProfileType,
  ProfileAttributes,
  ExpectedRatePer,
  ProfileExperience,
  ProfileCertifications,
  ProfileProjects,
  ProfileSkills,
  ProfileLanguages,
  ProfileContact,
  WorkplaceType,
  JobType,
} from 'src/global/models';

export class CreateProfileReqDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(300)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(300)
  fullname?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(3000)
  about?: string;

  @IsOptional()
  @IsEnum(ProfileType)
  type?: ProfileType;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(WorkplaceType, { each: true })
  workplaceTypes?: WorkplaceType[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(JobType, { each: true })
  jobTypes?: JobType[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileAttributes)
  attributies?: ProfileAttributes;

  @IsOptional()
  @IsNumber()
  experienceYear?: number;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  countryCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  city?: string;

  @IsOptional()
  @Min(0.01, {
    message: 'The expected rate must not be less than $constraint1',
  })
  @Max(1000000, {
    message: 'The expected rate must not be greater than $constraint1',
  })
  @IsNumber(undefined, {
    message: 'The expected rate must be decimal or integer',
  })
  @Transform(({ value }: { value: string }) =>
    ((value && typeof value === 'string') || typeof value === 'number') &&
    !Number.isNaN(Number(value))
      ? Number(value)
      : value,
  )
  expectedRate?: number;

  @IsOptional()
  @IsEnum(ExpectedRatePer)
  expectedRatePer?: ExpectedRatePer;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileExperience)
  experience?: ProfileExperience;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileCertifications)
  certifications?: ProfileCertifications;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileProjects)
  projects?: ProfileProjects;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileSkills)
  skills?: ProfileSkills;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileLanguages)
  languages?: ProfileLanguages;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileContact)
  contact?: ProfileContact;
}
