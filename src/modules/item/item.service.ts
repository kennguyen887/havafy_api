import { Injectable } from '@nestjs/common';
import { Repository, JsonContains, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { ItemEntity } from 'src/global/entities';
import {
  CreateItemReqDto,
  GetItemListResponseDto,
  GetItemListQueryDto,
  GetItemListItemDto,
  CreateItemResponseDto,
  UpdateItemReqDto,
} from './dto';
import { MediaService } from '../media/media.service';
import { plainToInstance } from 'class-transformer';
import { ItemStatus, FeatureType } from 'src/global/models';
import { Nullable } from 'src/global/utils/types';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
    private readonly mediaService: MediaService,
  ) {}

  async createItem(
    userId: Nullable<string>,
    data: CreateItemReqDto,
  ): Promise<CreateItemResponseDto> {
    const id = uuid();
    await this.itemRepository.insert(
      new ItemEntity({
        ...data,
        status: ItemStatus.ACTIVE,
        attributes: data.attributies,
        userId,
        id,
      }),
    );
    return { id };
  }

  async updateItem(
    id: string,
    data: UpdateItemReqDto,
  ): Promise<CreateItemResponseDto> {
    await this.itemRepository.update(id, new ItemEntity({ ...data }));
    return { id };
  }

  async linkItem(id: string, userId: string): Promise<CreateItemResponseDto> {
    const item = await this.itemRepository.findOne({
      where: {
        userId: IsNull(),
        id,
      },
    });
    if (item) {
      await this.itemRepository.update(id, { userId });
    }
    return { id };
  }

  async deleteItem(userId: string, itemId: string): Promise<void> {
    await this.itemRepository.delete({
      id: itemId,
      userId,
    });
    await this.mediaService.deleteMedia({
      userId,
      featureId: itemId,
      featureType: FeatureType.ITEM,
    });
  }

  async getItem(userId: string, id: string): Promise<GetItemListItemDto> {
    const item = await this.itemRepository.findOne({
      where: {
        userId,
        id,
      },
    });
    return plainToInstance(GetItemListItemDto, item);
  }

  async getList(
    userId: string,
    query: GetItemListQueryDto,
  ): Promise<GetItemListResponseDto> {
    const { skills, tags, offset, limit, pageIndex, pageSize } = query;
    let attributes = {};

    if (tags?.length) {
      attributes = { ...attributes, tags };
    }

    if (skills?.length) {
      attributes = { ...attributes, skills };
    }

    const [items, total] = await this.itemRepository.findAndCount({
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
        status: ItemStatus.ACTIVE,
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
      data: items.map((item: ItemEntity) =>
        plainToInstance(GetItemListItemDto, item),
      ),
    };
  }
}
