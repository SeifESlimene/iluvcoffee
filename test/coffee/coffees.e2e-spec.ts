import { CreateCoffeeDto } from './../../src/coffees/dto/create-coffee.dto';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TestingModule, Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter';
import { WrapResponseInterceptor } from '../../src/common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from '../../src/common/interceptors/timeout.interceptor';
import * as request from 'supertest';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla']
  }

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'pass123',
            database: 'postgres',
            autoLoadEntities: true,
            synchronize: true
        })
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

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

    // app.useGlobalFilters(new HttpExceptionFilter())
    // app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor())

    await app.init();
  });

  it('Create [POST /]', () => {
    return request(app.getHttpServer()).post('/coffees').send(coffee as CreateCoffeeDto).expect(HttpStatus.CREATED).then(({ body }) => {
        const expectedCoffee = jasmine.objectContaining({ 
            ...coffee,
            flavors: jasmine.arrayContaining(
                coffee.flavors.map(name => jasmine.objectContaining({ name }))
            )
        })
        expect(body).toEqual(expectedCoffee)
    })
  })
  it.todo('Get all [GET /]')
  it.todo('Get One [GET /:id]')
  it.todo('Update One [PATCH /:id]')
  it.todo('Delete One [DELETE /:id]')

  afterAll(async () => {
    await app.close()
  })
});
