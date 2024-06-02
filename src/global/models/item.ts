import { IsString, IsOptional, IsArray, MaxLength } from 'class-validator';

export enum ItemStatus {
  DRAFT = 'draft',
  FOR_REVIEW = 'for_review',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ItemType {
  HIRE_REQUEST = 'hire_request',
  BECOME_PARTNER_REQUEST = 'become_partner_request',
  CONTRACT = 'contract',
  FEEDBACK = 'feedback',
  CUSTOMER_SERVICE = 'customer_service',
  OTHER = 'other',
}

export class ItemAttributes {
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
