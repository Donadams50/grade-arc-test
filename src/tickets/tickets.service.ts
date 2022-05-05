import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { Ticket } from './entities/ticket.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly userService: UsersService,
  ) {}

  //    CREATE TICKET
  async create(createTicketInput: CreateTicketInput): Promise<Ticket> {
    const newTicket = this.ticketRepository.create(createTicketInput);
    return this.ticketRepository.save(newTicket);
  }
  // get all tickets
  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: ['plane'],
    });
  }

  // get a ticket by id
  async findOne(id: string): Promise<Ticket> {
    return this.ticketRepository.findOneOrFail(id);
  }

  //Update ticket by id
  async update(updateTicketInput: UpdateTicketInput): Promise<Ticket> {
    const ticketToUpdate = await this.ticketRepository.findOneOrFail(
      updateTicketInput.id,
    );
    return this.ticketRepository.save({
      ...ticketToUpdate,
      ...updateTicketInput,
    });
  }

  //delete ticket by id
  async remove(id: string): Promise<Ticket> {
    const ticketToUpdate = await this.ticketRepository.findOneOrFail(id);
    return this.ticketRepository.remove(ticketToUpdate);
  }

  //find all ticket that is for a plane
  async findPlaneTickets(planeId: string): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        planeId,
      },
      relations: ['plane'],
    });
  }

  // this is to get the details of the user that owns a ticket
  async findTicketOwner(userId: string): Promise<User> {
    return this.userService.findOneUser(userId);
  }
}
