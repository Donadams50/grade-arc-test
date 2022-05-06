import { Plane } from './entities/plane.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { Repository } from 'typeorm';

export const replicaPlane: Plane = {
  id: 'hfhfjkd-hdhdh-hdhhd',
  planeName: 'Flying emirate',
  departureAirport: 'Congo',
  arrivalAirport: 'Benar',
  departureTime: new Date('2022-10-30 7:58'),
  arrivalTime: new Date('2022-10-30 10:58'),
  isPlaneInTransit: false,
  updateIsPlaneInTransit: () => {
    return false;
  },
};

export const replicaTicket: Ticket = {
  id: Date.now() + '' + Math.floor(Math.random() * 100),
  ticketName: 'Flying ticket',
  userId: Date.now() + '' + Math.floor(Math.random() * 100),
  planeId: Date.now() + '' + Math.floor(Math.random() * 100),
  isTicketBooked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  updateIsBooked: () => {
    return true;
  },
  userDepartureAirport: 'Ibadan',
  userArrivalAirport: 'Kano',
  userDepartureTime: new Date('2022-10-30 10:58'),
};

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export const ticketServiceReplica = {
  create: jest.fn((fakedata) => fakedata),
  findAll: jest.fn((): Ticket[] => [replicaTicket]),
  find: jest.fn((): Ticket[] => [replicaTicket]),
  findOne: jest.fn((): Ticket => replicaTicket),
  update: jest.fn((): Ticket => replicaTicket),
  delete: jest.fn((): Ticket => replicaTicket),
};

export const planeServiceReplica = {
  create: jest.fn((fakedata) => fakedata),
  findAll: jest.fn((): Plane[] => [replicaPlane]),
  getPlanesNotInTransit: jest.fn((): Plane[] => [replicaPlane]),
  findOne: jest.fn((): Plane => replicaPlane),
  update: jest.fn((): Plane => replicaPlane),
  delete: jest.fn((): Plane => replicaPlane),
  find: jest.fn((): Plane[] => [replicaPlane]),
};

export const newPlane = {
  id: 'gdgdhdh-9hfhfh-8hd',
  planeName: 'quarters airline',
  departureAirport: 'Kano',
  arrivalAirport: 'Lagos',
  departureTime: '2022-10-30 10:58',
  arrivalTime: '2022-10-30 11:58',
  isPlaneInTransit: false,
  updateIsPlaneInTransit: () => {
    return false;
  },
};

export const planeRepositoryMock: MockType<Repository<Plane>> = {
  create: jest.fn((fakedata) => fakedata),
  save: jest.fn((fakedata) => fakedata),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  remove: jest.fn(),
};
