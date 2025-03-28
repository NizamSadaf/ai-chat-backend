/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" }); // Allow CORS

  app.useWebSocketAdapter(new IoAdapter(app)); // Ensure WebSocket adapter is used

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log("🚀 Server running on http://localhost:3001");
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
