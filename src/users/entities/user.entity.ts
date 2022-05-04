import { Field, ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Ticket } from '../../tickets/entities/ticket.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  phoneNumber: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  email: string;

  @OneToOne(() => Ticket, (ticket) => ticket.user)
  @Field(() => Ticket, { nullable: true })
  ticket?: string;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
