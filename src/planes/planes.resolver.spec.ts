import { Test, TestingModule } from '@nestjs/testing';
import { PlanesResolver } from './planes.resolver';
import { PlanesService } from './planes.service';
import {
  replicaPlane,
  planeServiceReplica,
  planeModel,
} from './planes.mockdata';

describe('PlanesResolver', () => {
  let resolver: PlanesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanesResolver,
        PlanesService,
        {
          provide: PlanesService,
          useValue: planeServiceReplica,
        },
      ],
    }).compile();

    resolver = module.get<PlanesResolver>(PlanesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('get all planes id', () => {
    it('should get all planes', () => {
      const result = resolver.planes();
      expect(Array.isArray(result)).toEqual(true);
      expect(planeServiceReplica.findAll).toHaveBeenCalled();
    });
  });

  describe('get all  available planes: planes not in transit', () => {
    it('should get all planes', () => {
      const result = resolver.findnotInTransitPlanes();
      expect(Array.isArray(result)).toEqual(true);
      expect(planeServiceReplica.findAvailablePlanes).toHaveBeenCalled();
    });
  });

  describe('create a plane', () => {
    it('should create a plane', () => {
      const plane = resolver.createPlane(planeModel);
      expect(plane).toMatchObject(planeModel);
      expect(planeServiceReplica.create).toHaveBeenCalledWith(planeModel);
    });
  });

  describe('update a plane by id', () => {
    it('should update a plane', () => {
      resolver.updatePlane(planeModel);
      expect(planeServiceReplica.update).toHaveBeenCalledWith(planeModel);
    });
  });

  describe('delate a plane by id', () => {
    it('should delete plane', () => {
      const deletedPlane = resolver.deletePlane(replicaPlane.id);
      expect(deletedPlane).toMatchObject(replicaPlane);
      expect(planeServiceReplica.delete).toHaveBeenCalledWith(replicaPlane.id);
    });
  });
});
