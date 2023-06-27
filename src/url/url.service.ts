import { nanoid } from 'nanoid';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ICode, IUrl, IResponse, IUser } from '../models';
import { CreateUrlDto } from './dto';
import { PrismaService } from 'prisma/prisma.service';
import { PrometheusService, error, response } from '../utils';
import { IRes } from '../models/shared.model';

const base_url = process.env.BASE_URL;

@Injectable()
export class UrlService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prometheusService: PrometheusService,
  ) {}

  async create(createUrlDto: CreateUrlDto, user: IUser): Promise<IRes> {
    let { longUrl }: { longUrl: string } = createUrlDto;
    let { id }: IUser = user;
    const urlId: string = nanoid(10);
    longUrl = longUrl.replace(/\/?$/, '/');

    const checkUrl: IUrl = await this.prisma.url.findFirst({
      where: {
        longUrl,
      },
    });

    let newUrl: IUrl;
    if (!checkUrl) {
      newUrl = await this.prisma.url.create({
        data: {
          shortUrl: `${base_url}/${urlId}`,
          longUrl,
          urlCode: urlId,
          creatorId: id,
        },
      });

      await this.cacheManager.set(newUrl.shortUrl, {
        clicks: 0,
        longUrl: newUrl.longUrl,
      });
    } else {
      if (checkUrl.creatorId !== id) {
        error(`This URL '${longUrl}' is already used!`, ConflictException);
      } else {
        return response(`This URL '${longUrl}' is already created!`, 200, {
          shortUrl: checkUrl ? checkUrl.shortUrl : newUrl.shortUrl,
        });
      }
    }

    return response('Short URL created successfully!', 201, {
      shortUrl: checkUrl ? checkUrl.shortUrl : newUrl.shortUrl,
    });
  }

  async findAll(user: IUser): Promise<IRes> {
    let userUrls = await this.prisma.url.findMany({
      where: {
        creatorId: user.id,
      },

      orderBy: {
        createdAt: 'desc',
      },

      select: {
        id: true,
        shortUrl: true,
        longUrl: true,
        urlCode: true,
        createdAt: true,
        clicks: true,
      },
    });

    return response(
      userUrls.length
        ? 'User URLs retrieved successfully'
        : 'No URLs for this user!',
      200,
      userUrls,
    );
  }

  async findOne(param: ICode, res: IResponse): Promise<void> {
    const { code }: ICode = param;
    const shortUrl: string = `${base_url}/${code}`;

    const url: IUrl = await this.prisma.url.findFirst({
      where: {
        shortUrl,
      },
    });

    if (url) {
      this.prometheusService.incrementClicks(url.shortUrl);

      res.redirect(url.longUrl);

      await this.cacheManager.set(url.shortUrl, {
        clicks: url.clicks + 1,
        longUrl: url.longUrl,
      });

      await this.prisma.url.updateMany({
        where: {
          id: url.id,
        },
        data: {
          clicks: { increment: 1 },
        },
      });
    } else {
      error(`Url with this code '${code}' not found!`, NotFoundException);
    }
  }

  async remove(param: ICode, user: IUser): Promise<void> {
    const { code }: ICode = param;

    const checkUrl: IUrl = await this.prisma.url.findFirst({
      where: {
        urlCode: code,
      },
    });

    if (!checkUrl)
      error(`Url with this code '${code}' not found!`, NotFoundException);

    if (checkUrl.creatorId !== user.id)
      error(
        `You dont have access to delete this URL '${checkUrl.shortUrl}'!`,
        ForbiddenException,
      );

    await this.prisma.url.delete({
      where: {
        urlCode: code,
      },
    });
  }

  // http://localhost:3000/mpsyrDIvvd

  async findClicksNumber(param: ICode, user: IUser): Promise<IRes> {
    const { code }: ICode = param;
    const shortUrl: string = `${base_url}/${code}`;

    await this.cacheManager.get(shortUrl);
    console.log(shortUrl);

    const checkUrl: IUrl = await this.prisma.url.findFirst({
      where: {
        urlCode: code,
      },
    });

    if (!checkUrl)
      error(`Url with this code '${code}' not found!`, NotFoundException);

    if (checkUrl.creatorId !== user.id)
      error(
        `You dont have access to know the number of clicks for this URL '${shortUrl}'!`,
        ForbiddenException,
      );

    const clicks = await this.prisma.url.findFirst({
      where: {
        urlCode: code,
      },

      select: {
        clicks: true,
      },
    });

    return response('URL clicks retrieved successfully', 200, clicks);
  }

  getMetrics(): any {
    return this.prometheusService.getMetrics();
  }
}
