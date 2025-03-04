import { Response } from 'express';
import { Controller, Post, Get, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OpenAIService } from './openai.service';
import { Observable } from 'rxjs';

@Controller('app')
export class AppController {
  constructor(
    private readonly openAIService: OpenAIService
  ) {}

  @Post('respond')
  async streamMessage(@Req() req, @Res() res: Response): Promise<void> {
    const openaiStream = await this.openAIService.createChatCompletion(req.body.message, true);

    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    try {
        for await (const chunk of openaiStream) {
            const content = chunk.choices[0]?.delta?.content || '';
            res.write(content); // Write each chunk to the response
        }
    } catch (error) {
        console.error('Error streaming OpenAI response:', error);
        res.status(500).send('Error occurred during streaming.');
    } finally {
        res.end(); // End the response
    }
  }

  @Post('segment-image')
  @UseInterceptors(FileInterceptor('file'))
  async processImage(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {
      res.setHeader('Content-Type', file.mimetype);
      res.send(file.buffer);
      console.log("Funckin hit!")
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).send('Error occurred while processing image.');
    }
  }

  @Post('health-check')
  healthCheck() {
    return { status: 'ok' };
  }
}
