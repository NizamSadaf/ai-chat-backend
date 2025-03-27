// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable prettier/prettier */
// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   WebSocketServer,
//   MessageBody,
//   ConnectedSocket,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import axios from 'axios';
// import * as dotenv from 'dotenv';

// dotenv.config();

// @WebSocketGateway({ cors: { origin: '*' } }) // Enable CORS for frontend
// export class ChatGateway {
//   @WebSocketServer()
//   server: Server;

//   // private async fetchAIResponse(userMessage: string): Promise<string> {
//   //   const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"; 
//   //   // const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-Small-3.1-24B-Instruct-2503"; 

//   //   const API_KEY = process.env.HF_API_KEY;

//   //   try {
//   //     const response = await axios.post(
//   //       API_URL,
//   //       { inputs: `${userMessage}` },
//   //       {
//   //         headers: { Authorization: `Bearer ${API_KEY}` },
//   //       }
//   //     );

//   //     if (!response.data || !response.data[0]?.generated_text) {
//   //       return "Sorry, I couldn't process your request.";
//   //     }

//   //     return response.data[0].generated_text.trim();
//   //   } catch (error) {
//   //     console.error('Error fetching AI response:', error.message);
//   //     return 'Sorry, there was an error fetching the AI response.';
//   //   }
//   // }

//   private async fetchAIResponse(userMessage: string): Promise<string> {
//     const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"; 
//     const API_KEY = process.env.HF_API_KEY;
//     // const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText"; 
//     // const API_KEY = process.env.HF_API_KEY;
  
//     try {
//       const response = await axios.post(
//         API_URL,
//         {
//           inputs: `User: ${userMessage}\nAI:`, // Conversational format
//           parameters: {
//             max_new_tokens: 80, // Limit response length
//             temperature: 1.0, // Make responses more human-like
//             top_p: 0.5, // Add randomness for variety
//             return_full_text: false,
//           },
//         },
//         {
//           headers: { Authorization: `Bearer ${API_KEY}` },
//         }
//       );

//       // const response = await axios.post(
//       //   `${API_URL}?key=${API_KEY}`,
//       //   {
//       //     prompt: `User: ${userMessage}\nAI:`, // Makes the AI response more human
//       //     temperature: 0.7, // Adjust creativity
//       //     max_tokens: 100,  // Short but complete responses
//       //     stop: ["User:"],  // Prevents endless text generation
//       //   }
//       // );
  
//       if (!response.data || !response.data[0]?.generated_text) {
//         return "I'm not sure how to respond.";
//       }
  
//       return response.data[0].generated_text.trim();
//     } catch (error) {
//       console.error('Error fetching AI response:', error.message);
//       return "Sorry, I'm having trouble responding right now.";
//     }
//   }

//   @SubscribeMessage('message')
//   async handleMessage(@MessageBody() data: { username: string; message: string }, @ConnectedSocket() client: Socket) {
//     const { username, message } = data;

//     // Broadcast user message
//     this.server.emit('message', { username, message, isBot: false });

//     // Get AI response
//     const aiResponse = await this.fetchAIResponse(message);

//     // Broadcast AI response
//     setTimeout(() => {
//       this.server.emit('message', { username: 'AI Bot', message: aiResponse, isBot: true });
//     }, 1000);
//   }
// }

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   WebSocketServer,
//   MessageBody,
//   ConnectedSocket,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import axios from 'axios';
// import * as dotenv from 'dotenv';

// dotenv.config();

// @WebSocketGateway({ cors: { origin: '*' } })
// export class ChatGateway {
//   @WebSocketServer()
//   server: Server;

//   private async fetchAIResponse(userMessage: string): Promise<string> {
//     const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
//     const API_KEY = process.env.VITE_GEMINI_API;
//     if (!API_KEY) {
//       console.error("Missing GEMINI_API_KEY in .env");
//       return "Internal server error: API key not set.";
//     }

//     try {
//       const response = await axios.post(
//         `${API_URL}?key=${API_KEY}`,
//         {
//           contents: [
//             {
//               role: 'user',
//               parts: [{ text: userMessage }],
//             },
//           ],
//           generationConfig: {
//             temperature: 0.7,
//             topK: 40,
//             topP: 0.8,
//             maxOutputTokens: 100,
//             stopSequences: ["User:"],
//           },
//           safetySettings: [
//             { category: 'HARM_CATEGORY_HARASSMENT', threshold: 3 },
//             { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 3 },
//             { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 3 },
//             { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 3 },
//           ],
//         },
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
//       console.log('AI response:', aiReply);
//       return aiReply?.trim() || "I'm not sure how to respond.";
//     } catch (error) {
//       console.error('Error fetching AI response:', error.message);
//       return "Sorry, I'm having trouble responding right now.";
//     }
//   }

//   @SubscribeMessage('message')
//   async handleMessage(
//     @MessageBody() data: { username: string; message: string },
//     @ConnectedSocket() client: Socket
//   ) {
//     const { username, message } = data;

//     this.server.emit('message', { username, message, isBot: false });

//     const aiResponse = await this.fetchAIResponse(message);

//     setTimeout(() => {
//       this.server.emit('message', {
//         username: 'AI Bot',
//         message: aiResponse,
//         isBot: true,
//       });
//     }, 1000);
//   }
// }


// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable prettier/prettier */

// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   WebSocketServer,
//   MessageBody,
//   ConnectedSocket,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import axios from 'axios';
// import * as dotenv from 'dotenv';

// dotenv.config();

// @WebSocketGateway({ cors: { origin: '*' } })
// export class ChatGateway {
//   @WebSocketServer()
//   server: Server;

//   private async fetchAIResponse(userMessage: string): Promise<string> {
//     const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
//     const API_KEY = process.env.VITE_GEMINI_API;
//     if (!API_KEY) {
//       console.error("Missing GEMINI_API_KEY in .env");
//       return "Internal server error: API key not set.";
//     }

//     try {
//       const response = await axios.post(
//         `${API_URL}?key=${API_KEY}`,
//         {
//           contents: [
//             {
//               role: 'user',
//               parts: [{ text: userMessage }],
//             },
//           ],
//           generationConfig: {
//             temperature: 0.,
//             topK: 40,
//             topP: 0.8,
//             maxOutputTokens: 30,
//             stopSequences: ["User:"],
//           },
//           safetySettings: [
//             { category: 'HARM_CATEGORY_HARASSMENT', threshold: 3 },
//             { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 3 },
//             { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 3 },
//             { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 3 },
//           ],
//         },
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
//       console.log('AI response:', aiReply);
//       return aiReply?.trim() || "I'm not sure how to respond.";
//     } catch (error) {
//       console.error('Error fetching AI response:', error.message);
//       return "Sorry, I'm having trouble responding right now.";
//     }
//   }

//   @SubscribeMessage('message')
//   async handleMessage(
//     @MessageBody() data: { username: string; message: string },
//     @ConnectedSocket() client: Socket
//   ) {
//     const { username, message } = data;

//     this.server.emit('message', { username, message, isBot: false });

//     const aiResponse = await this.fetchAIResponse(message);

//     setTimeout(() => {
//       this.server.emit('message', {
//         username: 'AI Bot',
//         message: aiResponse,
//         isBot: true,
//       });
//     }, 1000);
//   }
// }


// /* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// // import {
// //   WebSocketGateway,
// //   SubscribeMessage,
// //   WebSocketServer,
// //   MessageBody,
// //   ConnectedSocket,
// // } from '@nestjs/websockets';
// // import { Server, Socket } from 'socket.io';
// // import * as dotenv from 'dotenv';
// // import { GoogleGenerativeAI } from '@google/generative-ai';

// // dotenv.config();

// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// // @WebSocketGateway({ cors: { origin: '*' } }) // Enable CORS for frontend
// // export class ChatGateway {
// //   @WebSocketServer()
// //   server: Server;

// //   private async fetchAIResponse(userMessage: string): Promise<string> {
// //     try {
// //       const wantsBrief = /short|brief|only|names|keywords|limit|one word|just/i.test(userMessage);

// //       const prompt = wantsBrief
// //         ? `Provide a very short and direct answer. Only list names or keywords. No explanations.\n\n${userMessage}`
// //         : `Answer in a friendly, helpful way.\n\n${userMessage}`;

// //       const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// //       const result = await model.generateContent({
// //         contents: [
// //           {
// //             role: 'user',
// //             parts: [{ text: prompt }],
// //           },
// //         ],
// //         generationConfig: {
// //           maxOutputTokens: wantsBrief ? 50 : 250,
// //           temperature: wantsBrief ? 0.4 : 0.9,
// //           topP: 1,
// //           topK: 1,
// //         },
// //       });

// //       const response = result.response;
// //       const text = response.text();

// //       return text.trim();
// //     } catch (error) {
// //       console.error('Error fetching AI response:', (error as Error).message);
// //       return "Sorry, I'm having trouble responding right now.";
// //     }
// //   }

// //   @SubscribeMessage('message')
// //   async handleMessage(
// //     @MessageBody() data: { username: string; message: string },
// //     @ConnectedSocket() client: Socket,
// //   ) {
// //     const { username, message } = data;

// //     // Send user message
// //     this.server.emit('message', { username, message, isBot: false });

// //     // Get AI response
// //     const aiResponse = await this.fetchAIResponse(message);

// //     // Send AI message after short delay
// //     setTimeout(() => {
// //       this.server.emit('message', { username: 'AI Bot', message: aiResponse, isBot: true });
// //     }, 1000);
// //   }
// // }


/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   WebSocketServer,
//   MessageBody,
//   ConnectedSocket,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import axios from 'axios';
// import * as dotenv from 'dotenv';

// dotenv.config();

// @WebSocketGateway({ cors: { origin: '*' } })
// export class ChatGateway {
//   @WebSocketServer()
//   server: Server;

//   private async fetchAIResponse(userMessage: string, isShortResponse: boolean): Promise<string> {
//     const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
//     const API_KEY = process.env.VITE_GEMINI_API;
//     if (!API_KEY) {
//       console.error("Missing GEMINI_API_KEY in .env");
//       return "Internal server error: API key not set.";
//     }

//     try {
//       const response = await axios.post(
//         `${API_URL}?key=${API_KEY}`,
//         {
//           contents: [
//             {
//               role: 'user',
//               parts: [{ text: userMessage }],
//             },
//           ],
//           generationConfig: {
//             temperature: 0.7,
//             topK: 40,
//             topP: 0.8,
//             maxOutputTokens: isShortResponse ? 50 : 150,  // Adjusting tokens based on response length
//             stopSequences: ["User:"],
//           },
//           safetySettings: [
//             { category: 'HARM_CATEGORY_HARASSMENT', threshold: 3 },
//             { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 3 },
//             { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 3 },
//             { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 3 },
//           ],
//         },
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
//       console.log('AI response:', aiReply);
//       return aiReply?.trim() || "I'm not sure how to respond.";
//     } catch (error) {
//       console.error('Error fetching AI response:', error.message);
//       return "Sorry, I'm having trouble responding right now.";
//     }
//   }

//   @SubscribeMessage('message')
//   async handleMessage(
//     @MessageBody() data: { username: string; message: string; isShortResponse: boolean },
//     @ConnectedSocket() client: Socket
//   ) {
//     const { username, message, isShortResponse } = data;

//     this.server.emit('message', { username, message, isBot: false });

//     const aiResponse = await this.fetchAIResponse(message, isShortResponse);

//     setTimeout(() => {
//       this.server.emit('message', {
//         username: 'AI Bot',
//         message: aiResponse,
//         isBot: true,
//       });
//     }, 1000);
//   }
// }



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

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private async fetchAIResponse(userMessage: string, isShortResponse: boolean): Promise<string> {
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    const API_KEY = process.env.VITE_GEMINI_API;
    if (!API_KEY) {
      console.error("Missing GEMINI_API_KEY in .env");
      return "Internal server error: API key not set.";
    }

    // Define the prompt based on response length
    const prompt = isShortResponse
      ? `Provide a very short and direct answer. Only list names or keywords. No explanations. \n\n${userMessage}`
      : `Answer in a friendly, helpful way with a detailed explanation. \n\n${userMessage}`;

    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.8,
            maxOutputTokens: isShortResponse ? 30 : 150,  // Control the token count based on short or long answer
            stopSequences: ["User:"],
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 3 },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 3 },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 3 },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 3 },
          ],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('AI response:', aiReply);
      return aiReply?.trim() || "I'm not sure how to respond.";
    } catch (error) {
      console.error('Error fetching AI response:', error.message);
      return "Sorry, I'm having trouble responding right now.";
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { username: string; message: string; isShortResponse: boolean },
    @ConnectedSocket() client: Socket
  ) {
    const { username, message, isShortResponse } = data;

    // Send user message to the frontend
    this.server.emit('message', { username, message, isBot: false });

    // Get AI response based on the user's preference for short or long answer
    const aiResponse = await this.fetchAIResponse(message, isShortResponse);

    // Send AI response after a short delay
    setTimeout(() => {
      this.server.emit('message', {
        username: 'AI Bot',
        message: aiResponse,
        isBot: true,
      });
    }, 1000);
  }
}


