import { Injectable, Logger } from '@nestjs/common';
import type { WebhookEvent, UserJSON } from '@clerk/backend';

// note: type webhookEvent is not a Discriminated Union and typescript can't narrow safely so we don't extract from webhook we use UserJson
type ClerkUserEvent =
  | {
      type: 'user.created';
      data: UserJSON;
    }
  | {
      type: 'user.updated';
      data: UserJSON;
    }
  | {
      type: 'user.deleted';
      data: UserJSON;
    };

@Injectable()
export class ClerkWebhookService {
  private readonly logger = new Logger(ClerkWebhookService.name);

  async processWebhook(evt: WebhookEvent) {
    const event = evt as ClerkUserEvent;
    switch (event.type) {
      case 'user.created':
        await this.handleUserCreated(event.data);
        break;

      case 'user.updated':
        await this.handleUserUpdated(event.data);
        break;

      case 'user.deleted':
        await this.handleUserDeleted(event.data);
    }
  }

  private async handleUserCreated(data: UserJSON) {
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
