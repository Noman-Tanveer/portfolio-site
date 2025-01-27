import { Controller, Post, Stream } from '@nestjs/common';                                                     
import { OpenAIService } from './openai.service';

@Controller('openai')
export class AppController {
  constructor(private readonly openAIService: OpenAIService) {} 

  @Post('stream')
  @Stream()
  async streamMessage(@Req() req) {
    return this.openAIService.createChatCompletion(req.body.message, true);
  }

  @Post('health-check')                                                                                        
  healthCheck() {                                                                                              
    return { status: 'ok' };
  }
}
