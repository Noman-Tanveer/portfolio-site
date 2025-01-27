import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? 'https://your-production-url.com' : 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Optional: if you need cookies to be sent with the request
  });
  await app.listen(3000);                                                                                  
  console.log('Application listening on port 3000');
}

bootstrap();
