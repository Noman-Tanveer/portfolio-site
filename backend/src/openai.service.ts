import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
    constructor(private readonly configService: ConfigService) {}
    private openai = new OpenAI({
        apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });

    async createChatCompletion(prompt: string, stream: boolean) {
        const openai_stream = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: 'user', content: prompt }],
        stream: true,
        });
        let result = '';
        for await (const chunk of openai_stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            result += content;
        }

        return result;
    }
}
