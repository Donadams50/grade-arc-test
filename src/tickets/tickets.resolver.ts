import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { PlanesService } from '../planes/planes.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { User } from '../users/entities/user.entity';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly planesService: PlanesService,
  ) {}

  // Book new ticket.  Also it checks firstly if the plane you want to book is in transit before creating a ticket. If in transit, then you cannot book at the moment
  @Mutation(() => Ticket)
  async createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
  ) {
    const plane = await this.planesService.findOnePlane(
      createTicketInput.planeId,
    );
    if (plane.isPlaneInTransit) throw new Error('Plane in transit. Book later');
    return this.ticketsService.create(createTicketInput);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  tickets() {
    return this.ticketsService.findAll();
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOneTicket(@Args('id', { type: () => Int }) id: string) {
    return this.ticketsService.findOne(id);
  }

  @Mutation(() => Ticket)
  updateTicket(
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
  ) {
    return this.ticketsService.update(updateTicketInput);
  }

  @Mutation(() => Ticket)
  deleteTicket(@Args('id', { type: () => ID }) id: string) {
    return this.ticketsService.remove(id);
  }

  @ResolveField(() => User)
  ticketOwner(@Parent() ticket: Ticket) {
    return this.ticketsService.findTicketOwner(ticket.userId);
  }
}
