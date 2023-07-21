import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { before } from 'node:test';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';

const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    // mockUserRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should return created user', async () => {
      const createUserDTO: CreateUserDto = {
        name: 'heewon',
        email: 'wonbb3313@gmail.com',
        password: 'qwer1234%',
      };
      const newUser = { id: 1, ...createUserDTO };

      jest.spyOn(service, 'createUser').mockResolvedValue(newUser);
      const result = await controller.createUser(createUserDTO);
      expect(result).toBe(newUser);
    });
  });
});
//   //   describe('getUsers', () => {
//   //     it('should return all users in array'= {

//   //       }wait controller.findAll();
//   //       expect(findAllMock).toHaveBeenCalled();
//   //     });
// });
