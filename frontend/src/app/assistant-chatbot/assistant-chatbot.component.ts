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
      // Add user message
      this.chatbotService.addMessage({ text: this.userInput, user: true });
      this.messages = this.chatbotService.getMessages();
      
      // Send the message to the backend
      this.chatbotService.sendMessageToBackend(this.userInput).subscribe({
        next: (chunk) => {
          // For streaming, append each chunk received
          this.chatbotService.addMessage({ text: chunk, user: false });
          this.messages = this.chatbotService.getMessages();
        },
        error: (err) => {
          // Handle error in response
          console.error('Error occurred:', err);
        }
      });

      // Clear the input
      this.userInput = '';
    }
  }

  scrollToBottom() {
    try {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
