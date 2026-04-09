// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 2-A  ·  Add validators to this DTO
// ─────────────────────────────────────────────────────────────────────────────
// Requirements:
//   - title    → required string, between 3 and 100 characters
//   - description → optional string, max 300 characters
//   - status   → optional; if provided must be one of: 'pending' | 'in-progress' | 'done'
//               hint: look up @IsEnum() from class-validator
//
// Import what you need from 'class-validator' and add the decorators below.
// ─────────────────────────────────────────────────────────────────────────────
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  MinLength,
  MaxLength,
  IsIn,

} from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsString()
  status?: 'pending' | 'in-progress' | 'done';
}
