import {
  MaxLength,
  IsString,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseQueryDto } from 'src/global/models';
import { ItemType } from 'src/global/models';

export class GetItemListQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  skills?: string[];

  @IsOptional()
  @IsEnum(ItemType)
  type?: ItemType;
}
