import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

import { JwtAuthGuard } from './guards';
import { UrlModule } from './url/url.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
// import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      socket: {
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    }),

    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    // PrismaModule,
    UrlModule,
  ],

  controllers: [AppController],

  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
