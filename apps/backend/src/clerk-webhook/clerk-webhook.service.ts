import { Injectable } from '@nestjs/common';
import { CreateClerkWebhookDto } from './dto/create-clerk-webhook.dto';
import { UpdateClerkWebhookDto } from './dto/update-clerk-webhook.dto';

@Injectable()
export class ClerkWebhookService {
  create(createClerkWebhookDto: CreateClerkWebhookDto) {
    return 'This action adds a new clerkWebhook';
  }

  findAll() {
    return `This action returns all clerkWebhook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clerkWebhook`;
  }

  update(id: number, updateClerkWebhookDto: UpdateClerkWebhookDto) {
    return `This action updates a #${id} clerkWebhook`;
  }

  remove(id: number) {
    return `This action removes a #${id} clerkWebhook`;
  }
}
