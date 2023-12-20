import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ConsumerClaimResDto {
  @Expose()
  id!: string;

  @Expose()
  claimNo!: string;

  @Expose()
  submissionDate!: string;

  @Expose()
  claimantName!: string;

  @Expose()
  claimTypeCode!: string;

  @Expose()
  claimTypeName!: string;

  @Expose()
  status!: string;

  @Expose()
  currency!: string;

  @Expose()
  amount!: number;
}
