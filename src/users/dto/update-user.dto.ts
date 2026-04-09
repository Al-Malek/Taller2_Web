// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-B  ·  Create UpdateUserDto
// ─────────────────────────────────────────────────────────────────────────────
// Same as CreateUserDto but every field is optional (PATCH semantics).
// ─────────────────────────────────────────────────────────────────────────────


import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  MinLength,
  MaxLength,
  IsEmail,
  Min,
  Max,
  IsIn,
  isString,

} from 'class-validator';

export class UpdateUserDto{

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(50)
    name: string;
    
    @IsEmail()
    @IsOptional()
    email: string;
    
    @Min(1)
    @Max(120)
    @IsOptional()
    age: number;
    
    @IsString()
    @IsOptional()
    @IsIn([ 'student' ,'teacher','admin'])
    role: string;

}