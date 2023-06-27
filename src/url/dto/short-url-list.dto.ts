import { Expose } from 'class-transformer';
import { IUrl } from 'src/models';

export class ShortUrlList {
  @Expose()
  message: string;

  @Expose()
  statusCode: number;

  @Expose()
  data: IUrl[];
}
