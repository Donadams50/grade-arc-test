import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
@ObjectType()
export class Plane {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  planeName: string;

  @Column()
  @Field()
  departureTime: Date;

  @Column()
  @Field()
  arrivalTime: Date;

  @Column()
  @Field()
  departureAirport: string;

  @Column()
  @Field()
  arrivalAirport: string;

  // to know if a plane is in transit, once a plane is in transit, a ticket can not be booked for that plane. By default, it is set to false.
  @Column()
  @Field()
  isPlaneInTransit: boolean;

  @BeforeInsert()
  updateIsPlaneInTransit() {
    this.isPlaneInTransit = false;
  }

  @OneToMany(() => Ticket, (ticket) => ticket.plane, {
    createForeignKeyConstraints: false,
  })
  @Field(() => [Ticket], { nullable: true })
  tickets?: Ticket[];
}
