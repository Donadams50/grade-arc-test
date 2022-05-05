import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, Length } from 'class-validator';

@InputType()
export class CreateTicketInput {
  @IsAlpha()
  @Length(5, 10)
  @Field()
  ticketName: string;

  @Field()
  userId: string;

  @Field()
  planeId: string;
}
