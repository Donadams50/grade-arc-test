import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanesService } from './planes.service';
import { PlanesResolver } from './planes.resolver';
import { Plane } from './entities/plane.entity';
import { TicketsModule } from '../tickets/tickets.module';
import { DateFormater } from './date.formatter';

@Module({
  imports: [TypeOrmModule.forFeature([Plane]), forwardRef(() => TicketsModule)],
  providers: [PlanesResolver, PlanesService, DateFormater],
  exports: [PlanesService],
})
export class PlanesModule {}
