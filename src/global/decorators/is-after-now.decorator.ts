import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as dayjs from 'dayjs';

@ValidatorConstraint({ name: 'isAfterNow', async: false })
export class IsAfterNowConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string): boolean {
    if (!propertyValue) return true;

    return dayjs(propertyValue).isAfter(dayjs());
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be after now.`;
  }
}
