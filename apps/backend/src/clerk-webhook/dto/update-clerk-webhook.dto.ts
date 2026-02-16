import { PartialType } from '@nestjs/mapped-types';
import { CreateClerkWebhookDto } from './create-clerk-webhook.dto';

export class UpdateClerkWebhookDto extends PartialType(CreateClerkWebhookDto) {}
