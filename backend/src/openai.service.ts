import { OpenAI } from 'openai';

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
    
    return this.openai.chat.completions.stream(completion);
  }
}
