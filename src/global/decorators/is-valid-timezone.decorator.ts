import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidTimeZone', async: false })
export class IsValidTimeZone implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: value });
      return true;
    } catch (ex) {
      return false;
    }
  }

  defaultMessage(): string {
    return 'Invalid Timezone';
  }
}
