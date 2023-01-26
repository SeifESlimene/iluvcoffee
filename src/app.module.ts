import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config'
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';

@Module({
  imports: [
    CoffeesModule,
    ConfigModule.forRoot({
      load: [appConfig]
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true
  }),
    CoffeeRatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
