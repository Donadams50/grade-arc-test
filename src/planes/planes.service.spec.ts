import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlanesService } from './planes.service';
import { TicketsService } from '../tickets/tickets.service';
import { Plane } from './entities/plane.entity';
import {
  replicaPlane,
  ticketServiceReplica,
  newPlane,
  planeRepositoryMock,
} from './planes.mockdata';

describe('PlanesService', () => {
  let service: PlanesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanesService,
        TicketsService,
        { provide: getRepositoryToken(Plane), useValue: planeRepositoryMock },

        {
          provide: TicketsService,
          useValue: ticketServiceReplica,
        },
      ],
    }).compile();

    service = module.get<PlanesService>(PlanesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a plane', () => {
    it('should create a new plane', async () => {
      planeRepositoryMock.create.mockReturnValue(newPlane);
      const newplane = await service.create(newPlane);
      expect(newplane).toMatchObject(newPlane);
      expect(planeRepositoryMock.save).toHaveBeenCalledWith(newPlane);
    });
  });

  describe('find all planes', () => {
    it('should return all planes', async () => {
      planeRepositoryMock.find.mockReturnValue([replicaPlane]);
      const planes = await service.findAll();
      expect(planes).toEqual([replicaPlane]);
      expect(planeRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('find one plane', () => {
    it('should return a plane by id', async () => {
      planeRepositoryMock.findOne.mockReturnValue(replicaPlane);
      await service.findOne(replicaPlane.id);
      expect(planeRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        replicaPlane.id,
      );
    });
  });

  describe('update', () => {
    it('should update a plane with a particular id', async () => {
      planeRepositoryMock.update.mockReturnValue(newPlane);
      const updatedplane = await service.update(newPlane);
      expect(updatedplane).toMatchObject(newPlane);
      expect(planeRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        newPlane.id,
      );
      expect(planeRepositoryMock.save).toHaveBeenCalledWith(newPlane);
    });
  });

  describe('delete', () => {
    it('should delete a plane', async () => {
      planeRepositoryMock.delete.mockReturnValue(replicaPlane);
      await service.delete(replicaPlane.id);
      expect(planeRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        replicaPlane.id,
      );
    });
  });
});
