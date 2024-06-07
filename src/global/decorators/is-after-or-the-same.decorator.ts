/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as dayjs from 'dayjs';

@ValidatorConstraint({ name: 'isAfterOrTheSame', async: false })
export class IsAfterOrTheSameConstraint
  implements ValidatorConstraintInterface
{
  validate(propertyValue: string, args: ValidationArguments): boolean {
    if (!propertyValue) return true;

    return !dayjs(propertyValue).isBefore(
      // @ts-ignore
      dayjs(args.object[args.constraints[0]]),
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be after or the same ${args.constraints[0]}`;
  }
}
