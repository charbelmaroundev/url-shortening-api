import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';

import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { PrometheusService } from 'src/utils';

@Module({
  imports: [PrismaModule],

  controllers: [UrlController],

  providers: [UrlService, PrometheusService],

  exports: [UrlService],
})
export class UrlModule {}
