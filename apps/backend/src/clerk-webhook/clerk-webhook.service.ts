import { ConflictException, Injectable, Logger } from '@nestjs/common';
import type { WebhookEvent, UserJSON } from '@clerk/backend';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

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
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

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
    if (!email) {
      throw new Error('User has no email address');
    }

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser)
      throw new ConflictException('user with this email already exits');

    this.logger.log(`Creating User ${id} (${email})`);

    return this.prisma.user.create({
      data: {
        clerkId: id,
        email,
        first_name,
        last_name,
      },
    });
  }

  private async handleUserUpdated(data) {
    this.logger.log(`Updating User ${data.id}`);
  }
  private async handleUserDeleted(data) {
    this.logger.log(`Deleting User ${data.id}`);
  }
}
