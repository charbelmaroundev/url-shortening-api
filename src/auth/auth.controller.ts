import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SignUpDto } from './dto';
import { LocalAuthGuard } from '../guards';
import { AuthService } from './auth.service';
import { CurrentUser, Public } from '../decorators';
import { IUser } from '../models';
import { IRes } from '../models/shared.model';
import { Serialize } from '../decorators/serialize.decorator';
import { ResponseDto } from '../utils';

@Public()
@ApiTags('Auth')
@Controller('auth')
@Serialize(ResponseDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* SIGN UP
  @Post('signup')
  @ApiOperation({ description: 'POST request to Sign Up' })
  signUp(@Body() body: SignUpDto): Promise<IRes> {
    return this.authService.signUp(body);
  }

  //* SIGN IN
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'POST request to Sign In' })
  @UseGuards(LocalAuthGuard)
  signIn(@CurrentUser() user: IUser): Promise<IRes> {
    return this.authService.signIn(user);
  }
}
