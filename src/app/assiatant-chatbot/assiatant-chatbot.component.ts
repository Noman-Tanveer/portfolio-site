import { Component, ElementRef, ViewChild } from '@angular/core';

interface Message {
  text: string;
  user: boolean;
}

@Component({
  selector: 'app-assiatant-chatbot',
  templateUrl: './assiatant-chatbot.component.html',
  styleUrls: ['./assiatant-chatbot.component.scss']
})
export class AssiatantChatbotComponent {
  @ViewChild('chatBody') private chatBody!: ElementRef<HTMLDivElement>;
  messages: Message[] = [];
  userInput = '';

  constructor() {
    // Dummy initialization for demonstration
    this.messages = [
      { text: 'Hello! I am ChattyBot Noman\'s assistant, How can I help you today?', user: false },
    ];
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, user: true });
      this.userInput = '';
      this.scrollToBottom();

      // Simulate bot response after a short delay
      setTimeout(() => {
        this.messages.push({ text: 'I\'m working on the LLM chatbot it would be here soon. Thank you for your patience.', user: false });
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
