// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 2-B  ·  Build the UpdateTaskDto
// ─────────────────────────────────────────────────────────────────────────────
// Requirements:
//   - Same fields as CreateTaskDto but ALL fields are optional (it's a PATCH)
//   - Re-use the same validators but add @IsOptional() to each field
// ─────────────────────────────────────────────────────────────────────────────

import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsIn } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(['pending', 'in-progress', 'done'])
  status?: 'pending' | 'in-progress' | 'done';
}
