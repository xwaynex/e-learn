import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

export interface CreateUserInput {
  clerkId?: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  password?: string | null;
}
