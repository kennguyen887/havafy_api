import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as dayjs from 'dayjs';

@ValidatorConstraint({ name: 'isBeforeNow', async: false })
export class IsBeforeNowConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string): boolean {
    if (!propertyValue) return true;

    return dayjs(propertyValue).isBefore(dayjs());
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be before now.`;
  }
}
