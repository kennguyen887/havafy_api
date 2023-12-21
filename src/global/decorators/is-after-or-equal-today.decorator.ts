import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as dayjs from 'dayjs';

@ValidatorConstraint({ name: 'isAfterOrEqualToday', async: false })
export class IsAfterOrEqualTodayConstraint
  implements ValidatorConstraintInterface
{
  validate(propertyValue: string): boolean {
    if (!propertyValue) return true;

    return !dayjs(propertyValue).isBefore(dayjs().startOf('day'));
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be after or equal today.`;
  }
}
