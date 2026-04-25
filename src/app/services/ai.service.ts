import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor() {}

  private API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  private API_KEY = '';

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content:
                'You are a medical assistant. Only give general information about skin symptoms.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      });

      const data = await response.json();

      console.log('AI RAW RESPONSE:', data);

      return (
        data?.choices?.[0]?.message?.content?.trim() ?? 'No response from AI'
      );
    } catch (err) {
      console.error(err);
      return 'Error connecting to AI service';
    }
  }
}
