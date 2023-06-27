import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Res } from '@nestjs/common';

import { IResponse } from './models';
import { Public } from './decorators';
import { UrlCodeDto } from './url/dto';
import { UrlService } from './url/url.service';

@Public()
@ApiTags('Url')
@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

  @Get('metrics')
  @ApiOperation({
    description:
      'GET request to monitor the number of clicks on each short URL.',
  })
  getMetrics() {
    return this.urlService.getMetrics();
  }

  @Get(':code')
  @ApiOperation({
    description: 'Get request to redirect short URL to long URL.',
  })
  findOne(@Param() param: UrlCodeDto, @Res() res: IResponse) {
    return this.urlService.findOne(param, res);
  }
}
