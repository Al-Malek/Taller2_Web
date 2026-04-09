// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 2-B  ·  Build the UpdateTaskDto
// ─────────────────────────────────────────────────────────────────────────────
// Requirements:
//   - Same fields as CreateTaskDto but ALL fields are optional (it's a PATCH)
//   - Re-use the same validators but add @IsOptional() to each field
// ─────────────────────────────────────────────────────────────────────────────

// TODO: import validators from 'class-validator'
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  status?: 'pending' | 'in-progress' | 'done';
}

