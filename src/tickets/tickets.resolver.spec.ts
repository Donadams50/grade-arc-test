import { Test, TestingModule } from '@nestjs/testing';
import { TicketsResolver } from './tickets.resolver';
import { TicketsService } from './tickets.service';
import { PlanesService } from '../planes/planes.service';
import {
  newTicketExampleResolver,
  ticketServiceReplica,
  mockTicket,
} from './tickets.mockdata';
import { planeServiceReplica } from '../planes/planes.mockdata';

describe('TicketsResolver', () => {
  let resolver: TicketsResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsResolver,
        TicketsService,
        PlanesService,
        {
          provide: TicketsService,
          useValue: ticketServiceReplica,
        },
        {
          provide: PlanesService,
          useValue: planeServiceReplica,
        },
      ],
    }).compile();

    resolver = module.get<TicketsResolver>(TicketsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('create a new ticket', () => {
    it('should create a ticket', async () => {
      const ticket = await resolver.createTicket(newTicketExampleResolver);
      expect(ticket).toMatchObject(newTicketExampleResolver);
      expect(ticketServiceReplica.create).toHaveBeenCalledWith(
        newTicketExampleResolver,
      );
    });
  });

  describe('get all ticket', () => {
    it('should get all tickets', async () => {
      const result = await resolver.tickets();
      expect(Array.isArray(result)).toEqual(true);
      expect(ticketServiceReplica.findAll).toHaveBeenCalled();
    });
  });

  describe('delete ticket by id', () => {
    it('should delete a ticket by id', () => {
      const deletedTicket = resolver.deleteTicket(mockTicket.id);
      expect(deletedTicket).toMatchObject(mockTicket);
      expect(ticketServiceReplica.remove).toHaveBeenCalledWith(mockTicket.id);
    });
  });
});
