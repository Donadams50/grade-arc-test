import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  BeforeInsert,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

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

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
