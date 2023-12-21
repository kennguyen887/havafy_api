import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsNumberWithDecimalDigits', async: false })
class IsNumberWithDecimalDigitsConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments): boolean {
    if (typeof value !== 'number' && typeof value !== 'string') {
      return false;
    }

    const { maxLength, maxDecimalDigits } = args.constraints[0];
    const stringValue = typeof value === 'number' ? String(value) : value;
    const decimalDigits = stringValue.split('.')[1];

    return (
      (!decimalDigits || decimalDigits.length <= maxDecimalDigits) &&
      stringValue.length <= maxLength + 1
    );
  }

  defaultMessage(args: ValidationArguments): string {
    const { maxLength, maxDecimalDigits } = args.constraints[0];
    return `Value must be a number with maximum ${maxLength} precision and 0 to ${maxDecimalDigits} scale.`;
  }
}

export function IsNumberWithDecimalDigits(
  options: { maxLength: number; maxDecimalDigits: number },
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isNumberWithDecimalDigits',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [options],
      options: validationOptions,
      validator: IsNumberWithDecimalDigitsConstraint,
    });
  };
}
