import { ID } from '@nestjs/graphql';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  //    CREATE USER
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  //    READ USERS
  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //    UPDATE USER
  @Mutation(() => User)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserInput);
  }

  //   DELETE USER
  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
