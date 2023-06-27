import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { UrlService } from './url.service';
import { CurrentUser } from '../decorators';
import { CreateUrlDto, UrlCodeDto } from './dto';
import { PrometheusService, ResponseDto } from '../utils/index';
import { IUser } from '../models';
import { IRes } from '../models/shared.model';
import { Serialize } from 'src/decorators/serialize.decorator';

@Controller('url')
@ApiTags('Url')
@Serialize(ResponseDto)
@UseInterceptors(CacheInterceptor)
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly prometheusService: PrometheusService,
  ) {}

  @Post()
  @ApiOperation({ description: 'POST request to create short URL.' })
  create(
    @Body() createUrlDto: CreateUrlDto,
    @CurrentUser() user: IUser,
  ): Promise<IRes> {
    return this.urlService.create(createUrlDto, user);
  }

  @Get('my-urls')
  @ApiBearerAuth()
  @ApiOperation({ description: 'GET request to retrieve user short URLs.' })
  findAll(@CurrentUser() user: IUser): Promise<IRes> {
    return this.urlService.findAll(user);
  }

  @Get(':code')
  @ApiOperation({
    description:
      'GET request to retrieve the number of clicks for specific short URL.',
  })
  findClicksNumber(
    @Param() param: UrlCodeDto,
    @CurrentUser() user: IUser,
  ): Promise<IRes> {
    return this.urlService.findClicksNumber(param, user);
  }

  @Delete(':code')
  @HttpCode(204)
  @ApiOperation({ description: 'DELETE request to delete a short URL.' })
  remove(
    @Param() param: UrlCodeDto,
    @CurrentUser() user: IUser,
  ): Promise<void> {
    return this.urlService.remove(param, user);
  }
}
