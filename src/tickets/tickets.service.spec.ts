import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketsService } from './tickets.service';
import { UsersService } from '../users/users.service';
import { PlanesService } from '../planes/planes.service';
import { Ticket } from './entities/ticket.entity';
import {
  userServiceReplica,
  planeServiceReplica,
  newTicketExample,
  replicaTicket,
} from './tickets.mockdata';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

describe('TicketsService', () => {
  let service: TicketsService;
  const ticketRepositoryMock: MockType<Repository<Ticket>> = {
    create: jest.fn((fakedata) => fakedata),
    save: jest.fn((fakedata) => fakedata),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        UsersService,
        PlanesService,
        { provide: getRepositoryToken(Ticket), useValue: ticketRepositoryMock },
        {
          provide: UsersService,
          useValue: userServiceReplica,
        },
        {
          provide: PlanesService,
          useValue: planeServiceReplica,
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new ticket', async () => {
      ticketRepositoryMock.create.mockReturnValue(newTicketExample);
      const newTicket = await service.create(newTicketExample);
      expect(newTicket).toMatchObject(newTicketExample);
      expect(ticketRepositoryMock.save).toHaveBeenCalledWith(newTicketExample);
    });
  });

  describe('findAll', () => {
    it('should return all tickets', async () => {
      ticketRepositoryMock.find.mockReturnValue([replicaTicket]);
      const tickets = await service.findAll();
      expect(tickets).toEqual([replicaTicket]);
      expect(ticketRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user with a particular id', async () => {
      ticketRepositoryMock.findOne.mockReturnValue(replicaTicket);
      await service.findOne(replicaTicket.id);
      expect(ticketRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        replicaTicket.id,
      );
    });
  });

  describe('update', () => {
    it('should update a user with a particular id', async () => {
      ticketRepositoryMock.update.mockReturnValue(replicaTicket);
      const updatedTicket = await service.update(replicaTicket);
      expect(updatedTicket).toMatchObject(replicaTicket);
      expect(ticketRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        replicaTicket.id,
      );
      expect(ticketRepositoryMock.save).toHaveBeenCalledWith(replicaTicket);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      ticketRepositoryMock.delete.mockReturnValue(replicaTicket);
      await service.remove(replicaTicket.id);
      expect(ticketRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        replicaTicket.id,
      );
    });
  });
});
