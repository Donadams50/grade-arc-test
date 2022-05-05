import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreatePlaneInput } from './dto/create-plane.input';
import { UpdatePlaneInput } from './dto/update-plane.input';
import { Plane } from './entities/plane.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { TicketsService } from '../tickets/tickets.service';

@Injectable()
export class PlanesService {
  constructor(
    @InjectRepository(Plane)
    private readonly planeRepository: Repository<Plane>,
    @Inject(forwardRef(() => TicketsService))
    private readonly ticketsService: TicketsService,
  ) {}

  // create new plane
  async createNewPlane(createPlaneInput: CreatePlaneInput): Promise<Plane> {
    const newPlane = this.planeRepository.create(createPlaneInput);
    return this.planeRepository.save(newPlane);
  }

  // returna all planes
  async findAllPlanes(): Promise<Plane[]> {
    return this.planeRepository.find();
  }

  //get plane by id
  async findOnePlane(id: string) {
    return this.planeRepository.findOneOrFail(id);
  }

  // returna all available planes
  async getPlanesNotInTransit(): Promise<Plane[]> {
    return this.planeRepository.find({
      where: { isPlaneInTransit: false },
    });
  }

  //update plane by id
  async updatePlane(updatePlaneInput: UpdatePlaneInput) {
    const planeToUpdate = await this.planeRepository.findOneOrFail(
      updatePlaneInput.id,
    );
    return this.planeRepository.save({
      ...planeToUpdate,
      ...updatePlaneInput,
    });
  }

  //delete plane by id
  async deletePlane(id: string): Promise<Plane> {
    const planeToUpdate = await this.planeRepository.findOneOrFail(id);
    return this.planeRepository.remove(planeToUpdate);
  }

  //get all ticket that is for a plane
  async getPlaneTickets(planeId: string): Promise<Ticket[]> {
    return this.ticketsService.findPlaneTickets(planeId);
  }
}
