import { Injectable } from '@nestjs/common';
import { Repository, JsonContains, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { ProfileEntity } from 'src/global/entities';
import {
  CreateProfileReqDto,
  GetProfileListResponseDto,
  GetProfileListQueryDto,
  GetProfileListProfileDto,
  CreateProfileResponseDto,
  UpdateProfileReqDto,
} from './dto';
import { MediaService } from '../media/media.service';
import { plainToInstance } from 'class-transformer';
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
    userId: Nullable<string>,
    data: CreateProfileReqDto,
  ): Promise<CreateProfileResponseDto> {
    const id = uuid();
    await this.profileRepository.insert(
      new ProfileEntity({
        ...data,
        status: ProfileStatus.ACTIVE,
        attributes: data.attributies,
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

  async linkProfile(id: string, userId: string): Promise<CreateProfileResponseDto> {
    const profile = await this.profileRepository.findOne({
      where: {
        userId: IsNull(),
        id,
      },
    });
    if (profile) {
      await this.profileRepository.update(id, { userId });
    }
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

  async getProfile(userId: string, id: string): Promise<GetProfileListProfileDto> {
    const profile = await this.profileRepository.findOne({
      where: {
        userId,
        id,
      },
    });
    return plainToInstance(GetProfileListProfileDto, profile);
  }

  async getList(
    userId: string,
    query: GetProfileListQueryDto,
  ): Promise<GetProfileListResponseDto> {
    const { skills, tags, offset, limit, pageIndex, pageSize } = query;
    let attributes = {};

    if (tags?.length) {
      attributes = { ...attributes, tags };
    }

    if (skills?.length) {
      attributes = { ...attributes, skills };
    }

    const [profiles, total] = await this.profileRepository.findAndCount({
      select: [
        'id',
        'userId',
        'title',
        'type',
        'description',
        'createdAt',
        'status',
        'attributes',
      ],
      where: {
        status: ProfileStatus.ACTIVE,
        userId,
        attributes: attributes ? JsonContains(attributes) : undefined,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: limit,
      // cache: true,
    });

    return {
      total,
      pageIndex,
      pageSize,
      data: profiles.map((profile: ProfileEntity) =>
        plainToInstance(GetProfileListProfileDto, profile),
      ),
    };
  }
}
