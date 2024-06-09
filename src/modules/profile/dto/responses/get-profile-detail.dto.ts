import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  ProfileStatus,
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

@Exclude()
export class GetProfileDetailDto {
  @Expose()
  id!: string;

  @Expose()
  userId!: string;

  @Expose()
  verified!: boolean;

  @Expose()
  title!: string;

  @Expose()
  fullname!: string;

  @Expose()
  about!: string;

  @Expose()
  type!: ProfileType;

  @Expose()
  expectedRatePer!: ExpectedRatePer;

  @Expose()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  workplaceTypes!: WorkplaceType[];

  @Expose()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  jobTypes!: JobType[];

  @Expose()
  @Type(() => ProfileAttributes)
  attributies!: ProfileAttributes;

  @Expose()
  @Type(() => Number)
  reviewRate!: number;

  @Expose()
  @Type(() => Number)
  experienceYear!: number;

  @Expose()
  countryCode!: string;

  @Expose()
  city!: string;

  @Expose()
  @Type(() => Number)
  expectedRate!: number;

  @Expose()
  experience!: ProfileExperience;

  @Expose()
  certifications!: ProfileCertifications;

  @Expose()
  projects!: ProfileProjects;

  @Expose()
  skills!: ProfileSkills;

  @Expose()
  languages!: ProfileLanguages;

  @Expose()
  contact!: ProfileContact;

  @Expose()
  status!: ProfileStatus;

  @Expose()
  attributes!: ProfileAttributes;
}
