import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export const replicaUser: User = {
  id: Date.now() + '' + Math.floor(Math.random() * 100),
  firstName: 'Adam',
  lastName: 'Alaka',
  address: 'Joyce b road, Ibadan',
  username: 'donadams',
  phoneNumber: '08144964388',
  email: 'sumbomatic@email.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};
export const userRepositoryMock: MockType<Repository<User>> = {
  create: jest.fn((dto) => dto),
  save: jest.fn((dto) => dto),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  remove: jest.fn(),
};

export const newUserModel = {
  firstName: 'Adam',
  lastName: 'Alaka',
  username: 'donadams',
  address: '',
  phoneNumber: '08144964388',
  email: 'sumbomatic@email.com',
};
