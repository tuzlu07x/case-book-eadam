import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/users/dtos/users.signin.dto';
import { RegisterDto } from 'src/users/dtos/users.register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.ok)
  @Post('login')
  signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<any> {
    return this.authService.register(
      registerDto.username,
      registerDto.password,
    );
  }
}
