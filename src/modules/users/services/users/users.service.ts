import { Injectable } from '@nestjs/common';
import { User } from '../../../auth/models/interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'user@example.com',
      password: '$2a$10$iPQ31vJHiZbUwg.MA5xu.uqrka8ma6GYFWqxJ4KvDwdjCilYROmQK', // password: password
      isAdmin: false,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
