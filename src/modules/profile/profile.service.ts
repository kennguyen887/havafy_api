import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { ProfileEntity } from 'src/global/entities';
import {
  CreateProfileReqDto,
  CreateProfileResponseDto,
  UpdateProfileReqDto,
} from './dto';
import { MediaService } from '../media/media.service';
import { ProfileStatus, FeatureType } from 'src/global/models';
import { Nullable } from 'src/global/utils/types';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    private readonly mediaService: MediaService,
  ) {}

  async createProfile(
    userId: string,
    data: CreateProfileReqDto,
  ): Promise<CreateProfileResponseDto> {
    const id = uuid();
    await this.profileRepository.insert(
      new ProfileEntity({
        ...data,
        jobTypes: data.jobTypes?.join(',') ?? '',
        workplaceTypes: data.workplaceTypes?.join(',') ?? '',
        status: ProfileStatus.ACTIVE,
        userId,
        id,
      }),
    );
    return { id };
  }

  async updateProfile(
    id: string,
    data: UpdateProfileReqDto,
  ): Promise<CreateProfileResponseDto> {
    await this.profileRepository.update(id, new ProfileEntity({ ...data }));
    return { id };
  }

  async deleteProfile(userId: string, profileId: string): Promise<void> {
    await this.profileRepository.delete({
      id: profileId,
      userId,
    });
    await this.mediaService.deleteMedia({
      userId,
      featureId: profileId,
      featureType: FeatureType.ITEM,
    });
  }

  async getProfile(id: string): Promise<Nullable<ProfileEntity>> {
    return this.profileRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getProfileByUser(userId: string): Promise<Nullable<ProfileEntity>> {
    return this.profileRepository.findOne({
      where: {
        userId,
      },
    });
  }
}
