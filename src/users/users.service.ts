import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserRole } from 'src/Enums/user.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(
    username: string,
    password: string,
    role?: UserRole,
  ): Promise<UserEntity> {
    const user = this.userRepository.create({ username, password, role });
    return await this.userRepository.save(user);
  }

  async findById(id: number) {
    return await this.userRepository.findOneById(id);
  }
}
