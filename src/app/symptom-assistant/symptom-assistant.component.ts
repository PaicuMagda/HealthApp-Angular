import { Component } from '@angular/core';
import { AiService } from '../services/ai.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-symptom-assistant',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, NgFor],
  templateUrl: './symptom-assistant.component.html',
  styleUrls: ['./symptom-assistant.component.scss'],
})
export class SymptomAssistantComponent {
  messages: Message[] = [];
  input = '';
  loading = false;

  constructor(private aiService: AiService) {}

  async sendMessage() {
    if (!this.input.trim()) return;

    const userText = this.input;

    this.messages = [...this.messages, { role: 'user', text: userText }];

    this.input = '';
    this.loading = true;

    try {
      const reply = await this.aiService.sendMessage(userText);

      this.messages = [...this.messages, { role: 'bot', text: reply }];
    } catch (err) {
      this.messages = [
        ...this.messages,
        {
          role: 'bot',
          text: 'Error connecting to AI service',
        },
      ];
    }

    this.loading = false;
  }
}
