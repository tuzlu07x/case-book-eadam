import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    passw: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(passw, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(username: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(username, hashedPassword);
    const { password: _, ...result } = user;
    return result;
  }
}
