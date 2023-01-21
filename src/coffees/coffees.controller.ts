import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Res, Patch, Delete } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
	@Get()
	findAll() {
		return 'This action return all coffees'
	}
	
	@Get(':id')
	findOne(@Param('id') id: string) {
		return `This action return #${id} coffee`
	}

	@Post()
	 @HttpCode(HttpStatus.GONE)
	create(@Body() body) {
		return body
		// return `This action creates a coffee`
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() body) {
		return `This action updates #${id} coffee`
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return `This action removes #${id} coffee`
	}
}
