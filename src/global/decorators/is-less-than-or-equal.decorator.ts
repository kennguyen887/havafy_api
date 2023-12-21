import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const IsLessThanOrEqual = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isLessThanOrEqual',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, number>)[
            relatedPropertyName
          ];
          return (
            typeof value === 'number' &&
            typeof relatedValue === 'number' &&
            value <= relatedValue
          );
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must less than or equal ${args.constraints}.`;
        },
      },
    });
  };
};
