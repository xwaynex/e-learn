import { Module } from '@nestjs/common';
import { ClerkWebhookService } from './clerk-webhook.service';
import { ClerkWebhookController } from './clerk-webhook.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ClerkWebhookController],
  providers: [ClerkWebhookService],
})
export class ClerkWebhookModule {}
