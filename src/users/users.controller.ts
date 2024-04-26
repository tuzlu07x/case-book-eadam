import {
  Controller,
  UseGuards,
  Body,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/guard';
import { UserCreateDto } from './dtos/users.create.dto';
import { UsersService } from './users.service';
import { UserEntity } from 'src/Entities/user.entity';
import { Roles } from 'src/roles/decorator';
import { UserRole } from 'src/Enums/user.enum';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  @Roles(UserRole.ADMIN)
  async create(
    @Body(ValidationPipe) userDto: UserCreateDto,
  ): Promise<UserEntity> {
    const { username, password, role } = userDto;
    return await this.userService.create(username, password, role);
  }
}
