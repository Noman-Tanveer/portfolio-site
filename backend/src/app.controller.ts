import { Controller, Post, Get, Req } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { Observable } from 'rxjs';

@Controller('app')
export class AppController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('respond')
  async streamMessage(@Req() req): Promise<Observable<string>> {
    return this.openAIService.createChatCompletion(req.body.message, true);
  }

  @Post('health-check')
  healthCheck() {
    return { status: 'ok' };
  }
}
