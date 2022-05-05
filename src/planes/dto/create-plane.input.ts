import { InputType, Field } from '@nestjs/graphql';
import { Length, IsString, IsAlpha } from 'class-validator';

@InputType()
export class CreatePlaneInput {
  @Length(3, 20)
  @Field()
  planeName: string;

  @IsString()
  @Field()
  departureTime: string;

  @IsString()
  @Field()
  arrivalTime: string;

  @IsAlpha()
  @Field()
  departureAirport: string;

  @IsAlpha()
  @Field()
  arrivalAirport: string;
}
