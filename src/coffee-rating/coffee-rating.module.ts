import { DatabaseModule } from './../database/database.module';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      password: 'password',
      port: 5432
    }),
    CoffeesModule
  ],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
