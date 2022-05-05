import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Plane } from '../../planes/entities/plane.entity';

@Entity()
@ObjectType()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  ticketName: string;

  @Column()
  @Field()
  userId: string;

  @OneToOne(() => User, (user) => user.ticket, { onDelete: 'CASCADE' })
  @Field(() => User, { nullable: true })
  user?: User;

  @Column()
  @Field()
  isTicketBooked: boolean;

  @BeforeInsert()
  updateIsBooked() {
    this.isTicketBooked = true;
  }

  @Column()
  @Field()
  planeId: string;

  @ManyToOne(() => Plane, (plane) => plane.tickets, {
    onDelete: 'CASCADE',
  })
  @Field(() => Plane, { nullable: true })
  plane?: Plane;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
