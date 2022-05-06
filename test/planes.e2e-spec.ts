import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

import { getConnection } from 'typeorm';

import { Plane } from '../src/planes/entities/plane.entity';

const planes = [
  {
    id: 'd5ee1778-7f7c-46b6-a6a5-6216176db24a',
    planeName: 'Quarters Airlines',
    departureTime: 'Wed, Oct 26, 2022 7:58 AM',
    arrivalTime: 'Sun, Oct 30, 2022 10:58 AM',
    departureAirport: 'Ibadan',
    arrivalAirport: 'Lagos',
    isPlaneInTransit: true,
    tickets: [
      {
        id: '39e26813-ef49-4a45-9425-98222f0d7edb',
        ticketName: 'Test Ticket',
      },
      {
        id: '55140cc1-250c-464e-843c-2ae8edebfbb8',
        ticketName: 'Test Ticket',
      },
      {
        id: 'ba9536bd-00d0-4b2b-99e1-109695ac2f0f',
        ticketName: 'Test Ticket',
      },
      {
        id: '7d2134ba-7900-400e-8ec2-124edc98078c',
        ticketName: 'Test Ticket',
      },
    ],
  },
  {
    id: 'd5ee1778-7f7c-46b6-a6a5-76768585nf',
    planeName: 'Vodaphone Airlines',
    departureTime: 'Wed, Oct 26, 2022 7:58 AM',
    arrivalTime: 'Sun, Oct 30, 2022 10:58 AM',
    departureAirport: 'Kano',
    arrivalAirport: 'Bauchi',
    isPlaneInTransit: false,
    tickets: [
      {
        id: '39e26813-ef49-4a45-9425-98222f0d7edb',
        ticketName: 'Test Ticket',
      },
      {
        id: '55140cc1-250c-464e-843c-2ae8edebfbb8',
        ticketName: 'Test Ticket',
      },
      {
        id: 'ba9536bd-00d0-4b2b-99e1-109695ac2f0f',
        ticketName: 'Test Ticket',
      },
      {
        id: '7d2134ba-7900-400e-8ec2-124edc98078c',
        ticketName: 'Test Ticket',
      },
    ],
  },
];

describe(' End to End Plane resolver', () => {
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

  const createPlaneQuery = `
  mutation createPlane($CreatePlaneInput: CreatePlaneInput!) {
    createPlane (createPlaneInput: $CreatePlaneInput) {,
      planeName.
      departureTime,
      arrivalTime,
      departureAirport,
      arrivalAirport
    }
  }
`;

  describe('createPlane', () => {
    it('should create a new plane', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          operationName: 'createPlane',
          variables: {
            createPlaneInput: {
              planeName: 'Test Airlines',
              departureTime: new Date('2022-10-26 07:58'),
              arrivalTime: new Date('2022-10-30 10:58'),
              departureAirport: 'Ibadan',
              arrivalAirport: 'Lagos',
            },
          },
          query: createPlaneQuery,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createPlane).toEqual({
            planeName: 'Test Airlines',
            departureTime: '2022-10-26 07:58',
            arrivalTime: '2022-10-30 10:58',
            departureAirport: 'Ibadan',
            arrivalAirport: 'Lagos',
          });
        });
    });
  });

  describe('planes', () => {
    it('should return all planes', async () => {
      const connection = await getConnection();
      planes.map(async (plane) => {
        await connection
          .createQueryBuilder()
          .insert()
          .into(Plane)
          .values(plane)
          .execute();
      });
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            '{planes {id planeName departureTime arrivalTime departureAirport arrivalAirport }}',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.planes.length).toEqual(planes.length);
          expect(Array.isArray(res.body.data.planes)).toEqual(true);
        });
    });
  });

  describe('deletePlane', () => {
    const deletePLaneQuery = () => `
      mutation deletePlane(
        $id: ID!,
      ) {
        deletePlane(id: $id) {
            planeName
        }
      }
    `;
    it('should delete a plane', async () => {
      const connection = getConnection();
      planes.map(async (plane) => {
        await connection
          .createQueryBuilder()
          .insert()
          .into(Plane)
          .values(plane)
          .execute();
        return request(app.getHttpServer())
          .post(gql)
          .send({
            operationName: 'deletePlane',
            variables: { id: 'd5ee1778-7f7c-46b6-a6a5-76768585nf' },
            query: deletePLaneQuery(),
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.deletePlane).toEqual({
              planeName: 'Vodaphone Airlines',
            });
          });
      });
    });
  });
});
