import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PlanesService } from './planes.service';
import { Plane } from './entities/plane.entity';
import { CreatePlaneInput } from './dto/create-plane.input';
import { UpdatePlaneInput } from './dto/update-plane.input';
import { Ticket } from '../tickets/entities/ticket.entity';

@Resolver(() => Plane)
export class PlanesResolver {
  constructor(private readonly planesService: PlanesService) {}

  // create new plane.
  @Mutation(() => Plane)
  createPlane(@Args('createPlaneInput') createPlaneInput: CreatePlaneInput) {
    return this.planesService.createNewPlane(createPlaneInput);
  }

  // get all planes
  @Query(() => [Plane])
  planes() {
    return this.planesService.findAllPlanes();
  }

  //get plane by id
  @Query(() => Plane, { name: 'plane' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.planesService.findOnePlane(id);
  }

  // get all tickets for a plane
  @ResolveField(() => Ticket)
  tickets(@Parent() plane: Plane) {
    return this.planesService.getPlaneTickets(plane.id);
  }

  // get all planes that are not in transit or available planes
  @Query(() => [Plane])
  notInTransitPlanes() {
    return this.planesService.getPlanesNotInTransit();
  }

  //update plane by id which also involves changing the transit status/stste of the plane. Once the plane has arrived, this can be called to change isPlaneInTransit to false
  @Mutation(() => Plane)
  updatePlane(@Args('updatePlaneInput') updatePlaneInput: UpdatePlaneInput) {
    return this.planesService.updatePlane(updatePlaneInput);
  }

  //delete plane by id
  @Mutation(() => Plane)
  deletePlane(@Args('id', { type: () => ID }) id: string) {
    return this.planesService.deletePlane(id);
  }
}
