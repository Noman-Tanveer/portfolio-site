import { Controller, Post } from '@nestjs/common';
import { Request } from 'express';
import { OpenAIService } from './openai.service';

@Controller('app')
export class AppController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('stream')
  async streamMessage(@Request() req) {
    return this.openAIService.createChatCompletion(req.body.message, true);
  }

  @Post('health-check')
  healthCheck() {
    return { status: 'ok' };
  }
}
