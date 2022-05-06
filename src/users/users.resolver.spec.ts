import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import {
  replicaUser,
  newUserModel,
  userServiceReplica,
} from './users.mockdata';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        {
          provide: UsersService,
          useValue: userServiceReplica,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('get all users', () => {
    it('should get all users', async () => {
      const result = await resolver.users();
      expect(Array.isArray(result)).toEqual(true);
      expect(userServiceReplica.findAll).toHaveBeenCalled();
    });
  });

  describe('create a new user', () => {
    it('should create a new user', async () => {
      const newUser = resolver.createUser(newUserModel);
      expect(newUser).toMatchObject(newUserModel);
      expect(userServiceReplica.create).toHaveBeenCalledWith(newUserModel);
    });
  });

  describe('update user by id', () => {
    it('should update a user by id', async () => {
      const updatedUser = resolver.updateUser(replicaUser);
      expect(updatedUser).toMatchObject(replicaUser);
      expect(userServiceReplica.update).toHaveBeenCalledWith(replicaUser);
    });
  });

  describe('delate user by id', () => {
    it('should delete a user by id', async () => {
      const deletedUser = resolver.deleteUser(replicaUser.id);
      expect(deletedUser).toMatchObject(replicaUser);
      expect(userServiceReplica.delete).toHaveBeenCalledWith(replicaUser.id);
    });
  });

  describe('get one user by id', () => {
    it('should get a user by id', async () => {
      const user = resolver.findOne(replicaUser.id);
      expect(user).toMatchObject(replicaUser);
      expect(userServiceReplica.findOne).toHaveBeenCalledWith(replicaUser.id);
    });
  });
});
