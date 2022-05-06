import { Plane } from './entities/plane.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

export const replicaPlane: Plane = {
  id: Date.now() + '' + Math.floor(Math.random() * 100),
  planeName: 'Flying emirate',
  departureAirport: 'Congo',
  arrivalAirport: 'Benar',
  departureTime: new Date(),
  arrivalTime: new Date(),
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
  findOne: jest.fn((): Ticket => replicaTicket),
  update: jest.fn((): Ticket => replicaTicket),
  delete: jest.fn((): Ticket => replicaTicket),
};

export const planeServiceReplica = {
  create: jest.fn((fakedata) => fakedata),
  findAll: jest.fn((): Plane[] => [replicaPlane]),
  findAvailablePlanes: jest.fn((): Plane[] => [replicaPlane]),
  findOne: jest.fn((): Plane => replicaPlane),
  update: jest.fn((): Plane => replicaPlane),
  delete: jest.fn((): Plane => replicaPlane),
};

export const planeModel = {
  id: Date.now() + '' + Math.floor(Math.random() * 100),
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
