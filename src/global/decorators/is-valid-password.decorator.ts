import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidPassword', async: false })
export class IsValidPassword implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    // At least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(value);

    // At least one number
    const hasNumber = /\d/.test(value);

    // Password should meet all criteria
    return hasUpperCase && hasNumber;
  }

  defaultMessage(): string {
    return 'Invalid Password';
  }
}
