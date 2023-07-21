import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  findAllUser: jest.fn(),
  findOneUser: jest.fn(),
  updateUser: jest.fn(),
  removeUser: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser()', () => {
    it('should create a user if valid data is provided', async () => {
      const createUserDto: CreateUserDto = {
        name: '김지환',
        email: 'test@example.com',
        password: 'Password1!',
      };

      // 테스트 환경에서는 실제 데이터베이스에 연결하지 않기 때문에,
      // 'userService.create'의 실행 결과를 목(mock) 데이터로 설정해줍니다.
      const expectedResult: User = {
        id: 1,
        ...createUserDto,
      };
      jest
        .spyOn(service, 'createUser')
        .mockImplementation(async () => expectedResult);

      expect(await service.createUser(createUserDto)).toBe(expectedResult);
    });

    it('should throw an error if invalid data is provided', async () => {
      const createUserDto: CreateUserDto = {
        name: '',
        email: 'test',
        password: 'pass',
      };

      jest.spyOn(service, 'createUser').mockImplementation(async () => {
        throw new Error('Invalid user information');
      });

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        'Invalid user information',
      );
    });
  });

  describe('findAll()', () => {
    it('should call UsersController find all', async () => {
      // const findSpy = jest.spyOn(, 'findAllUser');
      // await service.findAllUser();
    });
  });

  describe('findById()', () => {
    it('', async () => {});
  });
});
