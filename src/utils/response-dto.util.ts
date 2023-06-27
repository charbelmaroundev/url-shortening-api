import { Expose } from 'class-transformer';

export class ResponseDto {
  @Expose()
  message: string;

  @Expose()
  statusCode: number;

  @Expose()
  data: any;
}
