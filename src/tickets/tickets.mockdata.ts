import { Plane } from '../planes/entities/plane.entity';
import { User } from '../users/entities/user.entity';
import { Ticket } from './entities/ticket.entity';

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

export const userServiceReplica = {
  create: jest.fn((fakedata) => fakedata),
  findAll: jest.fn((): User[] => [replicaUser]),
  findOne: jest.fn((): User => replicaUser),
  update: jest.fn((): User => replicaUser),
  delete: jest.fn((): User => replicaUser),
};

export const planeServiceReplica = {
  create: jest.fn((fakedata) => fakedata),
  findAll: jest.fn((): Plane[] => [replicaPlane]),
  findOne: jest.fn((): Plane => replicaPlane),
  update: jest.fn((): Plane => replicaPlane),
  delete: jest.fn((): Plane => replicaPlane),
};

export const replicaTicket = {
  id: Date.now() + '' + Math.floor(Math.random() * 100),
  ticketName: 'first ticket',
  userId: Date.now() + '' + Math.floor(Math.random() * 100),
  planeId: Date.now() + '' + Math.floor(Math.random() * 100),
  isTicketBooked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  updateIsBooked: () => {
    return false;
  },
  userDepartureAirport: 'London',
  userArrivalAirport: 'North london',
  userDepartureTime: '2022-10-28 10:58',
};

export const newTicketExampleService = {
  ticketName: 'Testing ticket',
  userId: Date.now() + '' + Math.floor(Math.random() * 100),
  planeId: Date.now() + '' + Math.floor(Math.random() * 100),
  isBooked: false,
  userDepartureTime: '2022-10-28 10:58',
  userDepartureAirport: 'Belgium',
  userArrivalAirport: 'Italy',
};

export const newTicketExampleResolver = {
  ticketName: 'Emirate ticket',
  userId: 'ffff-88880-if',
  planeId: 'gdgdhdh-9hfhfh-8hd',
  userDepartureAirport: 'Congo',
  userArrivalAirport: 'Benar',
  userDepartureTime: '2022-10-30 8:58',
};

export const mockTicket = {
  id: 'fff-t566-444444',
  ticketName: 'Emirate ticket',
  userId: 'jdjdj-56666ns-dddd',
  planeId: 'hdhdhdhd-jrjfjf-ndnd',
  isTicketBooked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateIsBooked: () => {},
  userDepartureAirport: 'Oluyole',
  userArrivalAirport: 'Ibadan',
  userDepartureTime: new Date('2022-10-28 10:58'),
};

export const ticketServiceReplica = {
  create: jest.fn((fakedata) => fakedata),
  findAll: jest.fn((): Ticket[] => [mockTicket]),
  findOne: jest.fn((): Ticket => mockTicket),
  update: jest.fn((): Ticket => mockTicket),
  remove: jest.fn((): Ticket => mockTicket),
};
