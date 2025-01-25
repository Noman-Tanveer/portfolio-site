import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService, Message } from '../services/chatbot.service';

@Component({
  selector: 'app-assistant-chatbot',
  templateUrl: './assistant-chatbot.component.html',
  styleUrls: ['./assistant-chatbot.component.scss']
})
export class AssistantChatbotComponent {
  @ViewChild('chatBody') private chatBody!: ElementRef<HTMLDivElement>;
  messages: Message[] = [];
  userInput = '';

  constructor(private chatbotService: ChatbotService) {
    this.messages = this.chatbotService.getMessages();
  }

  sendMessage() {
    if (this.userInput.trim()) {
      const userMessage: Message = { text: this.userInput, user: true };
      this.chatbotService.addMessage(userMessage);
      this.userInput = '';
      this.scrollToBottom();

      // Simulate bot response after a short delay
      setTimeout(() => {
        const botMessage: Message = { text: 'I\'m working on the LLM chatbot it would be here soon. Thank you for your patience.', user: false };
        this.chatbotService.addMessage(botMessage);
        this.scrollToBottom();
      }, 1000);
    }
  }

  scrollToBottom() {
    try {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
