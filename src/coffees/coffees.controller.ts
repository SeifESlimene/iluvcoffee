import { Controller, Get, Param, Post, Body, Patch, Delete, Query, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Request } from 'express'
import { REQUEST } from '@nestjs/core';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('coffees')
@UsePipes(ValidationPipe) // Controlled Scoped Pipe
@Controller('coffees')
export class CoffeesController {
	constructor(private readonly coffeesService: CoffeesService, @Inject(REQUEST) private readonly request: Request) {
		// console.log('CoffeesController created')
		// console.log(request.headers)
	}

	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Public()
	@Get()
	async findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {

		// console.log(protocol)
		// await new Promise(resolve => setTimeout(resolve, 2000))
		return this.coffeesService.findAll(paginationQuery)
	}
	
	@UsePipes(ValidationPipe) // Method Scoped Pipe
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		// console.log(id);
		
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