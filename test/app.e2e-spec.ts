import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserService } from 'src/users/users.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // service = moduleFixture.get<UserService>(UserService);

    app = moduleFixture.createNestApplication();
    await app.init();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Good night!');
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: '김지환입니뜨!!',
        email: ['tdd12@example.com'],
        password: 'Password1!',
      })
      .expect(400);
  });

  it('/users (POST) should return a 400 when invalid name is provided', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: '김지환남효정이다정최희원',
        email: ['test@example.com'],
        password: 'Password1!',
      })
      .expect(400);
  });

  it('/users (POST) should return a 400 when invalid password is provided', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: '김지환',
        email: ['test@example.com'],
        password: 'pwd',
      })
      .expect(400);
  });

  it('/users (GET)', () => {
    // const users = [
    //   {
    //     id: 1,
    //     name: '김지환',
    //     email: 'test@example.com',
    //     password: 'Password1!',
    //   },
    //   {
    //     id: 2,
    //     name: '넌누구니',
    //     email: 'who@areyou.com',
    //     password: 'Password!',
    //   },
    // ];

    // jest
    //   .spyOn(userService, 'findAllUser')
    //   .mockImplementation(() => Promise.resolve(users));

    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/users/:id (GET)', () => {
    // const user = {
    //   // id: 1,
    //   name: '김지환',
    //   email: 'test@example.com',
    //   password: 'Password1!',
    // };
    // const saved_user = userService.createUser(user);
    const user_id = 1;
    return request(app.getHttpServer()).get(`/users/1`).expect(200);
  });

  it('/users/:id (DELETE)', async () => {
    // const testData = {
    //   name: '김지환',
    //   email: 'test@example.com',
    //   password: 'Password1!',
    // };
    // const testUser = await userService.createUser(testData);

    // return request(app.getHttpServer())
    //   .delete(`/users/${testUser.id}`)
    //   .expect(204);

    return request(app.getHttpServer()).delete('/users/91').expect(200);
  });

  it('/users/:id (DELETE) - not found', async () => {
    return request(app.getHttpServer()).delete(`/users/10`).expect(404);
  });
});
