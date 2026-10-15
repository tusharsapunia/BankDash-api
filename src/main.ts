import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Bank-dash-api')
    .addBearerAuth()
    .setDescription('bankDash board api system')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `SERVER RUNNING ON :- http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `SERVER RUNNING ON :- http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
await bootstrap();
