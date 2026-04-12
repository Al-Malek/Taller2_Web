import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsSlug(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSlug',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return /^[a-z0-9-]+$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a slug (lowercase letters, numbers and hyphens)`;
        },
      },
    });
  };
}
