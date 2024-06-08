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
  title!: string;

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
  experienceYear!: ProfileExperience;

  @Expose()
  countryCode!: string;

  @Expose()
  city!: string;

  @Expose()
  expectedRate!: string;

  @Expose()
  experience!: string;

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
