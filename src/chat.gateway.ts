/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@WebSocketGateway({ cors: { origin: '*' } }) // Enable CORS for frontend
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // private async fetchAIResponse(userMessage: string): Promise<string> {
  //   const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"; 
  //   // const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-Small-3.1-24B-Instruct-2503"; 

  //   const API_KEY = process.env.HF_API_KEY;

  //   try {
  //     const response = await axios.post(
  //       API_URL,
  //       { inputs: `${userMessage}` },
  //       {
  //         headers: { Authorization: `Bearer ${API_KEY}` },
  //       }
  //     );

  //     if (!response.data || !response.data[0]?.generated_text) {
  //       return "Sorry, I couldn't process your request.";
  //     }

  //     return response.data[0].generated_text.trim();
  //   } catch (error) {
  //     console.error('Error fetching AI response:', error.message);
  //     return 'Sorry, there was an error fetching the AI response.';
  //   }
  // }

  private async fetchAIResponse(userMessage: string): Promise<string> {
    const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"; 
    const API_KEY = process.env.HF_API_KEY;
    // const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText"; 
    // const API_KEY = process.env.HF_API_KEY;
  
    try {
      const response = await axios.post(
        API_URL,
        {
          inputs: `User: ${userMessage}\nAI:`, // Conversational format
          parameters: {
            max_new_tokens: 80, // Limit response length
            temperature: 1.0, // Make responses more human-like
            top_p: 0.5, // Add randomness for variety
            return_full_text: false,
          },
        },
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );

      // const response = await axios.post(
      //   `${API_URL}?key=${API_KEY}`,
      //   {
      //     prompt: `User: ${userMessage}\nAI:`, // Makes the AI response more human
      //     temperature: 0.7, // Adjust creativity
      //     max_tokens: 100,  // Short but complete responses
      //     stop: ["User:"],  // Prevents endless text generation
      //   }
      // );
  
      if (!response.data || !response.data[0]?.generated_text) {
        return "I'm not sure how to respond.";
      }
  
      return response.data[0].generated_text.trim();
    } catch (error) {
      console.error('Error fetching AI response:', error.message);
      return "Sorry, I'm having trouble responding right now.";
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: { username: string; message: string }, @ConnectedSocket() client: Socket) {
    const { username, message } = data;

    // Broadcast user message
    this.server.emit('message', { username, message, isBot: false });

    // Get AI response
    const aiResponse = await this.fetchAIResponse(message);

    // Broadcast AI response
    setTimeout(() => {
      this.server.emit('message', { username: 'AI Bot', message: aiResponse, isBot: true });
    }, 1000);
  }
}

