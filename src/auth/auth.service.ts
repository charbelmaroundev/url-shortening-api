import { JwtService } from '@nestjs/jwt';
import { ConflictException, Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { IUser } from '../models';
import { error, response } from 'src/utils';
import { IRes } from '../models/shared.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //* SIGN UP
  async signUp(body: IUser): Promise<IRes> {
    const { email }: IUser = body;
    const checkEmail: IUser = await this.userService.findOneByEmail(email);

    if (checkEmail)
      error(
        `User with this email '${email}' is already exist!`,
        ConflictException,
      );

    await this.userService.create(body);

    return response(`Account Created Successfully`, 201);
  }

  //* SIGN IN
  async signIn(user: IUser): Promise<IRes> {
    const { id }: IUser = user;

    const accessToken = this.jwtService.sign({ id });

    return response('Logged in successfully!', 200, { accessToken });
  }
}
