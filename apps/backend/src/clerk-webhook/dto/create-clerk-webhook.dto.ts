import { IsEmail, IsString } from 'class-validator';

export class CreateClerkWebhookDto {}

export class CreateClerkUserDto {
  @IsEmail()
  email: string;

  @IsString()
  clerkId: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}
