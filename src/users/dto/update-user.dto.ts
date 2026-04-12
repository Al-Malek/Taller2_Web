// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-B  ·  Create UpdateUserDto
// ─────────────────────────────────────────────────────────────────────────────
// Same as CreateUserDto but every field is optional (PATCH semantics).
// ─────────────────────────────────────────────────────────────────────────────

import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsInt, Min, Max, IsOptional, IsIn } from 'class-validator';

export class UpdateUserDto {
	@IsString()
	@IsOptional()
	@MinLength(2)
	@MaxLength(50)
	name?: string;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsInt()
	@IsOptional()
	@Min(1)
	@Max(120)
	age?: number;

	@IsString()
	@IsOptional()
	@IsIn(['student', 'teacher', 'admin'])
	role?: 'student' | 'teacher' | 'admin';
}
