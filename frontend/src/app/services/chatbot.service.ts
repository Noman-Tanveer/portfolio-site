import { Injectable } from '@angular/core';

export interface Message {
  text: string;
  user: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private messages: Message[] = [];

  constructor() {
    // Dummy initialization for demonstration
    this.messages = [
      { text: 'Hello! How can I help you code today?', user: false },
    ];
  }

  getMessages(): Message[] {
    return this.messages;
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }
}
