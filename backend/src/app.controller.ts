import { Controller, Post, Get, Req } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('app')
export class AppController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('stream')
  async streamMessage(@Req() req) {
    return this.openAIService.createChatCompletion(req.body.message, true);
  }

  @Post('health-check')
  healthCheck() {
    return { status: 'ok' };
  }
}
