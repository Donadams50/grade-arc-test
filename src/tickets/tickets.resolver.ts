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
    if (plane.departureAirport != createTicketInput.userDepartureAirport)
      throw new Error(
        'User departure airport is not the same as the chosen plane departure airport. Please choose another plane ',
      );
    if (plane.arrivalAirport != createTicketInput.userArrivalAirport)
      throw new Error(
        'User arrival airport is not the same as the chosen plane arrival  airport. Please choose another plane ',
      );
    const isUserTimeInRangeWitheSelectedPlane =
      new Date(createTicketInput.userDepartureTime) >=
        new Date(plane.departureTime) &&
      new Date(createTicketInput.userDepartureTime) <=
        new Date(plane.arrivalTime);
    if (!isUserTimeInRangeWitheSelectedPlane)
      throw new Error(
        'User take off time is not in range of when the selected plane will move. Please choose another plane ',
      );
    return this.ticketsService.create(createTicketInput);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  async tickets() {
    const x = await this.ticketsService.findAll();
    console.log(x);
    return x;
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
