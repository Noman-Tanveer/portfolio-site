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
    
    // Use the proper method to stream events from OpenAI
    return this.openai.chat.completions.stream(completion);
  }
}
