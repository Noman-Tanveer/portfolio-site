import { Injectable , Request } from '@nestjs/common';
import { Readable } from 'stream';
import OpenAI from 'openai';

@Injectable()                                                                                                   
export class OpenAIService {
private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async* createChatCompletion(prompt: string, stream: boolean) {
    const completion = this.openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: 'user', content: prompt }],
    stream: true,
    });
    const chunks = await this.openai.streamifier(completion);
    for await (const chunk of chunks) {
    if (chunk.choices[0].delta.content) {
        yield JSON.stringify({
        type: 'stream',
        data: chunk.choices[0].delta.content
        });
    }}}
}
