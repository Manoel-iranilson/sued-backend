import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPassWordValue = await bcrypt.compare(password, user.password);
      if (isPassWordValue) {
        return { ...user, password: undefined };
      }
    }
    throw new Error('Email or password provided is incorrect');
  }
  login(user: any) {
    const payload: any = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);
    return token;
  }
}
