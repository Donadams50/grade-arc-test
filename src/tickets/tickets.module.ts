import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { Ticket } from './entities/ticket.entity';
import { UsersModule } from './../users/users.module';
import { PlanesModule } from '../planes/planes.module';
import { DateFormater } from '../date.formatter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    UsersModule,
    forwardRef(() => PlanesModule),
  ],
  providers: [TicketsResolver, TicketsService, DateFormater],
  exports: [TicketsService],
})
export class TicketsModule {}
