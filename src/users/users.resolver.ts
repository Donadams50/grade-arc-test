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

  // a mutation to create new user: it calls the create user service
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  //query to get all users: it calls the get users service
  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // a mutation to update a user by id : it calls the update user service
  @Mutation(() => User)
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserInput);
  }

  // a mutation to delete a user by id: it calls the delete user service
  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  //get user by id
  @Query(() => User, { name: 'plane' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }
}
