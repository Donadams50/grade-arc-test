import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

import { getConnection } from 'typeorm';

import { User } from '../src/users/entities/user.entity';

const users = [
  {
    id: 'tyuuu49494949',
    firstName: 'Adam',
    lastName: 'Alaka',
    username: 'don',
    email: 'sumbomatic@gmail.com',
    phoneNumber: '08144964388',
    address: 'OKe-Ado',
    createdAt: '2022-05-05T12:11:52.000Z',
    updatedAt: '2022-05-05T12:11:52.000Z',
  },
  {
    id: 'dkd-tfn5-nnnx',
    firstName: ' Bimpe',
    lastName: 'Adeshida',
    username: 'bim009',
    email: 'olabayo@gmail.com',
    phoneNumber: '08144964788',
    address: 'Joyve b',
    createdAt: '2022-05-05T12:11:52.000Z',
    updatedAt: '2022-05-05T12:11:52.000Z',
  },
];

describe(' End to End Users resolver', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const gql = '/graphql';

  const createUserQuery = `
  mutation createUser($CreateUserInput: CreateUserInput!) {
    createUser(createUserInput: $CreateUserInput) {
      firstName
      lastName
      username
      email
      address
      phoneNumber
    }
  }
`;

  describe('createUser', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          operationName: 'createUser',
          variables: {
            CreateUserInput: {
              firstName: 'Balogun',
              lastName: 'OLasupo',
              username: 'bal007',
              email: 'kkk@gmail.com',
              address: 'Lokoja',
              phoneNumber: '08144972256',
            },
          },
          query: createUserQuery,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toEqual({
            firstName: 'Balogun',
            lastName: 'OLasupo',
            username: 'bal007',
            email: 'kkk@gmail.com',
            address: 'Lokoja',
            phoneNumber: '08144972256',
          });
        });
    });
  });

  describe('users', () => {
    it('should return all users', async () => {
      const connection = await getConnection();
      users.map(async (user) => {
        await connection
          .createQueryBuilder()
          .insert()
          .into(User)
          .values(user)
          .execute();
      });
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            '{users {id firstName lastName username email address phoneNumber createdAt updatedAt }}',
        })
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body.data.users)).toEqual(true);
        });
    });
  });
});
