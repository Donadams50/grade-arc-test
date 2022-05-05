import { CreatePlaneInput } from './create-plane.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@InputType()
export class UpdatePlaneInput extends PartialType(CreatePlaneInput) {
  @Field(() => ID)
  id: string;

  @IsBoolean()
  @Field()
  isPlaneInTransit: boolean;
}
