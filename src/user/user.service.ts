import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data: Prisma.userCreateInput = {
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const createUser = await this.prisma.user.create({ data });

    return {
      ...createUser,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email } });
    return user;
  }
}
