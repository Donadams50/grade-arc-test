import { Test, TestingModule } from '@nestjs/testing';
import { PlanesResolver } from './planes.resolver';
import { PlanesService } from './planes.service';
import { replicaPlane, planeServiceReplica, newPlane } from './planes.mockdata';

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
      expect(planeServiceReplica.getPlanesNotInTransit).toHaveBeenCalled();
    });
  });

  describe('create a plane', () => {
    it('should create a plane', () => {
      const plane = resolver.createPlane(newPlane);
      expect(plane).toMatchObject(newPlane);
      expect(planeServiceReplica.create).toHaveBeenCalledWith(newPlane);
    });
  });

  describe('update a plane by id', () => {
    it('should update a plane', () => {
      resolver.updatePlane(newPlane);
      expect(planeServiceReplica.update).toHaveBeenCalledWith(newPlane);
    });
  });

  describe('delete a plane by id', () => {
    it('should delete plane', () => {
      const deletedPlane = resolver.deletePlane(replicaPlane.id);
      expect(deletedPlane).toMatchObject(replicaPlane);
      expect(planeServiceReplica.delete).toHaveBeenCalledWith(replicaPlane.id);
    });
  });
});
