import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = await this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    const userToUpdate = await this.userRepository.findOneOrFail(
      updateUserInput.id,
    );
    return this.userRepository.save({ ...userToUpdate, ...updateUserInput });
  }

  async deleteUser(id: string): Promise<User> {
    const userToDelete = await this.userRepository.findOneOrFail(id);
    return this.userRepository.remove(userToDelete);
  }
}
