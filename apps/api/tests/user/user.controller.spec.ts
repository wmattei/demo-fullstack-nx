import { Test } from '@nestjs/testing';
import { UserController } from 'apps/api/src/app/user/user.controller';
import { UserService } from 'apps/api/src/app/user/user.service';

describe('UserController', () => {
  let Controller: UserController;
  let Service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    Service = module.get<UserService>(UserService);
    Controller = module.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = ['asd', 'asd'];
      jest.spyOn(Service, 'getAll').mockImplementation(() => result);

      expect(await Controller.getAll()).toBe(result);
    });
  });
});
