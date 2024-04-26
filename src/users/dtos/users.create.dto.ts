import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/Enums/user.enum';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  role: UserRole;
}
