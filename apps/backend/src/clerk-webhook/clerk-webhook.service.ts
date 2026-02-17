import { Injectable, Logger } from '@nestjs/common';
import { WebhookEvent } from '@clerk/backend';
import { CreateClerkWebhookDto } from './dto/create-clerk-webhook.dto';
import { UpdateClerkWebhookDto } from './dto/update-clerk-webhook.dto';

@Injectable()
export class ClerkWebhookService {
  private readonly logger = new Logger(ClerkWebhookService.name);

  async processWebhook(evt: WebhookEvent) {
    const { type, data } = evt;

    switch (type) {
      case 'user.created':
        await this.handleUserCreated(data);
        break;

      case 'user.updated':
        await this.handleUserUpdated(data);
        break;

      case 'user.deleted':
        await this.handleUserDeleted(data);
    }
  }

  private async handleUserCreated(data) {
    const { id, email_addresses, first_name, last_name } = data;
    const email = email_addresses[0]?.email_address;

    this.logger.log(`Creating User ${id} (${email})`);
  }
  private async handleUserUpdated(data) {
    this.logger.log(`Updating User ${data.id}`);
  }
  private async handleUserDeleted(data) {
    this.logger.log(`Deleting User ${data.id}`);
  }
}
