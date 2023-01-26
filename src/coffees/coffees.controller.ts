import { Controller, Get, Param, Post, Body, Patch, Delete, Query, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Request } from 'express'
import { REQUEST } from '@nestjs/core';

@UsePipes(ValidationPipe) // Controlled Scoped Pipe
@Controller('coffees')
export class CoffeesController {
	constructor(private readonly coffeesService: CoffeesService, @Inject(REQUEST) private readonly request: Request) {
		console.log('CoffeesController created')
		console.log(request.headers)
	}

	@Get()
	findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.coffeesService.findAll(paginationQuery)
	}
	
	@UsePipes(ValidationPipe) // Method Scoped Pipe
	@Get(':id')
	findOne(@Param('id') id: number) {
		// console.log(typeof id);
		
		return this.coffeesService.findOne('' + id)
	}

	@Post()
	create(@Body() createCoffeeDto: CreateCoffeeDto) {
		// console.log(createCoffeeDto instanceof CreateCoffeeDto);
		return this.coffeesService.create(createCoffeeDto)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body(ValidationPipe /* Param Scoped Pipe */) updateCoffeeDto: UpdateCoffeeDto) {
		return this.coffeesService.update(id, updateCoffeeDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.coffeesService.remove(id)
	}
}
