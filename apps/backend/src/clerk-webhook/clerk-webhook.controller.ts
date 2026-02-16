import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClerkWebhookService } from './clerk-webhook.service';
import { CreateClerkWebhookDto } from './dto/create-clerk-webhook.dto';
import { UpdateClerkWebhookDto } from './dto/update-clerk-webhook.dto';

@Controller('clerk-webhook')
export class ClerkWebhookController {
  constructor(private readonly clerkWebhookService: ClerkWebhookService) {}

  @Post()
  create(@Body() createClerkWebhookDto: CreateClerkWebhookDto) {
    return this.clerkWebhookService.create(createClerkWebhookDto);
  }

  @Get()
  findAll() {
    return this.clerkWebhookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clerkWebhookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClerkWebhookDto: UpdateClerkWebhookDto) {
    return this.clerkWebhookService.update(+id, updateClerkWebhookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clerkWebhookService.remove(+id);
  }
}
