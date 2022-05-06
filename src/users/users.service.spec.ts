import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { replicaUser, userRepositoryMock, newUserModel } from './utils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    it('should create  new user', async () => {
      userRepositoryMock.create.mockReturnValue(newUserModel);
      const newuser = await service.createUser(newUserModel);
      expect(newuser).toMatchObject(newUserModel);
      expect(userRepositoryMock.save).toHaveBeenCalledWith(newUserModel);
    });
  });

  describe('find all user', () => {
    it('should return all available users', async () => {
      userRepositoryMock.find.mockReturnValue([replicaUser]);
      const allusers = await service.findAll();
      expect(allusers).toEqual([replicaUser]);
      expect(userRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('update a user', () => {
    it('should update  user with a known id', async () => {
      userRepositoryMock.update.mockReturnValue(replicaUser);
      const updateUser = await service.updateUser(replicaUser);
      expect(updateUser).toMatchObject(replicaUser);
      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        replicaUser.id,
      );
      expect(userRepositoryMock.save).toHaveBeenCalledWith(replicaUser);
    });
  });

  describe('delete a user by id', () => {
    it('should delete a user by id', async () => {
      userRepositoryMock.delete.mockReturnValue(replicaUser);
      await service.deleteUser(replicaUser.id);
      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        replicaUser.id,
      );
    });
  });

  describe('get a single user by id', () => {
    it('should get a user by id', async () => {
      userRepositoryMock.findOne.mockReturnValue(replicaUser);
      await service.findOneUser(replicaUser.id);
      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        replicaUser.id,
      );
    });
  });
});
