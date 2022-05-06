import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanesService } from './planes.service';
import { TicketsService } from '../tickets/tickets.service';
import { Plane } from './entities/plane.entity';
import {
  replicaPlane,
  MockType,
  ticketServiceReplica,
  planeModel,
} from './planes.mockdata';

describe('PlanesService', () => {
  let service: PlanesService;
  const planeRepositoryMock: MockType<Repository<Plane>> = {
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
  describe('create', () => {
    it('should create a new plane', async () => {
      planeRepositoryMock.create.mockReturnValue(planeModel);
      const newplane = await service.createNewPlane(planeModel);
      expect(newplane).toMatchObject(planeModel);
      expect(planeRepositoryMock.save).toHaveBeenCalledWith(planeModel);
    });
  });

  describe('findAll', () => {
    it('should return all planes', async () => {
      planeRepositoryMock.find.mockReturnValue([replicaPlane]);
      const planes = await service.findAllPlanes();
      expect(planes).toEqual([replicaPlane]);
      expect(planeRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a plane by id', async () => {
      planeRepositoryMock.findOne.mockReturnValue(replicaPlane);
      await service.findOnePlane(replicaPlane.id);
      expect(planeRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        replicaPlane.id,
      );
    });
  });

  describe('update', () => {
    it('should update a plane with a particular id', async () => {
      planeRepositoryMock.update.mockReturnValue(planeModel);
      const updatedplane = await service.updatePlane(planeModel);
      expect(updatedplane).toMatchObject(planeModel);
      expect(planeRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        planeModel.id,
      );
      expect(planeRepositoryMock.save).toHaveBeenCalledWith(planeModel);
    });
  });

  describe('delete', () => {
    it('should delete a plane', async () => {
      planeRepositoryMock.delete.mockReturnValue(replicaPlane);
      await service.deletePlane(replicaPlane.id);
      expect(planeRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        replicaPlane.id,
      );
    });
  });
});
