import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { IUser } from '../models';
import { hashData, error } from '../utils';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  //* CREATE USER
  async create(user: IUser): Promise<IUser> {
    let {
      email,
      password,
    }: {
      email: string;
      password: string;
    } = user;

    const hashedPassword: string = await hashData(password);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  //* VALIDATE USER
  async validateUser(email: string, password: string): Promise<IUser> {
    const checkEmail: IUser = await this.findOneByEmail(email);

    if (!checkEmail) error('Incorrect Credentials!', UnauthorizedException);

    const isMatch: boolean = await bcrypt.compare(
      password,
      checkEmail.password,
    );

    if (!isMatch) error('Incorrect Credentials!', UnauthorizedException);

    return checkEmail;
  }

  //* FIND ONE BY EMAIL
  async findOneByEmail(email: string): Promise<IUser> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  //* FIND ONE BY ID
  async findOneById(id: number): Promise<IUser> {
    const checkUser: IUser = await this.prisma.user.findUnique({
      where: {
        id: +id,
      },
    });

    if (!checkUser)
      error(`Account with this id ${id} not found!`, NotFoundException);

    return checkUser;
  }
}
