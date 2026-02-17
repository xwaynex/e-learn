import {
  Controller,
  Post,
  Headers,
  RawBodyRequest,
  Req,
  Res,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ClerkWebhookService } from './clerk-webhook.service';
import { Request, Response } from 'express';
import { Webhook } from 'svix';

@Controller('webhook')
export class ClerkWebhookController {
  constructor(private readonly clerkWebhookService: ClerkWebhookService) {}

  private readonly WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

  @Post('clerk')
  async handleWebhook(
    @Headers() headers: Record<string, string>,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    // 1. Get Headers
    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-timestamp'];

    if (!svix_id || !svix_signature || !svix_timestamp) {
      throw new BadRequestException('Missing svix headers');
    }

    // 2. Check body
    if (!req.rawBody) {
      throw new BadRequestException(
        'Raw body is missing. Ensure main.ts is configured correctly.',
      );
    }

    // 3, verify signature
    const payload = req.rawBody.toString('utf8');
    const secret = this.WEBHOOK_SECRET;
    const wh = new Webhook(secret);

    let evt: any;

    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-signature': svix_signature,
        'svix-timestamp': svix_timestamp,
      });
    } catch (err) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: `Invalid Signature: ${err}` });
    }

    await this.clerkWebhookService.processWebhook(evt);

    return res.status(HttpStatus.OK).send();
  }
}
