import { NestFactory } from '@nestjs/core';
import { AppModule } from './serverlesDeploy/http/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Películas')
    .setDescription('Documentación de la API de Películas')
    .setVersion('1.0')
    .addTag('peliculas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
