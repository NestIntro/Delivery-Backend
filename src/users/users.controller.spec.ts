import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { before } from 'node:test';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';

const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserController', () => {
  let app: INestApplication;
  let controller: UserController;
  let service: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    // mockUserRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('/findAllUser', () => {
    it('GET /', () => {});
  });

  // describe('createUser', () => {
  //   it('should return created user', async () => {
  //     const createUserRequest: CreateUserDto = {
  //       name: 'heewon',
  //       email: 'wonbb3313@gmail.com',
  //       password: 'qwer1234%',
  //     };

  //     const app = "http://localhost:3000";
  //     app.use(controller);
  //     request(app).post('/').send(createUserRequest).expect(200);
  //     // const newUser = { id: 1, ...createUserDTO };
  //     // jest.spyOn(service, 'createUser').mockResolvedValue(newUser);
  //     // const result = await controller.createUser(createUserDTO);
  //     // expect(result).toBe(newUser);
  //   });
  // });
});
