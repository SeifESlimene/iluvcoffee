import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as morgan from 'morgan'
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('combined'));
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor())


  const options = new DocumentBuilder().setTitle('Iluvcoffee').setDescription('Coffee application').setVersion('1.0').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)


  await app.listen(3000);
}
bootstrap();
