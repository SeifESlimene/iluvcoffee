import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
	@Get()
	findAll() {
		return 'This action return all coffees'
	}
}
  