import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../graphql/models/User';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['settings'] });
  }

  createUser(userData: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findOne( {where:{ id },  relations: ['settings'] })
  }

  async saveUser(user: User): Promise<User> {
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return await this.userRepository.save(user)
  }
}
