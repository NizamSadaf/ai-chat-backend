import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule], // Import HttpModule for API calls
  providers: [ChatGateway], // Register ChatGateway
})
export class AppModule {}
