import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OpenAIService } from './openai.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the configuration available globally
    envFilePath: '.env', // Default is '.env' in the root directory
  }),
],
  controllers: [AppController],
  providers: [OpenAIService],
})
export class AppModule {}
