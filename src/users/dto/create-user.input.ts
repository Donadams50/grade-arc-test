import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNumber, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Length(3, 50)
  @Field()
  firstName: string;

  @IsAlpha()
  @Length(3, 50)
  @Field()
  lastName: string;

  @IsAlpha()
  @Length(3, 50)
  @Field()
  username: string;

  @IsNumber()
  @Length(11, 11)
  @Field()
  phoneNumber: string;

  @IsAlpha()
  @Field()
  address: string;

  @IsEmail()
  @Field()
  email: string;
}
