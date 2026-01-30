import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });


  await app.listen(3001, '0.0.0.0'); 
  
  console.log(`🚀 BFF Server ready at: http://localhost:3001`);
  console.log(`📡 WebSocket Gateway should be active on the same port`);
}
bootstrap();