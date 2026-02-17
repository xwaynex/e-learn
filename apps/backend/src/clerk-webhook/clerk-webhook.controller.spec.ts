import { Test, TestingModule } from '@nestjs/testing';
import { ClerkWebhookController } from './clerk-webhook.controller';
import { ClerkWebhookService } from './clerk-webhook.service';

describe('ClerkWebhookController', () => {
  let controller: ClerkWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClerkWebhookController],
      providers: [ClerkWebhookService],
    }).compile();

    controller = module.get<ClerkWebhookController>(ClerkWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
