import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UrlCodeDto {
  @ApiProperty()
  @Length(10, 10)
  code: string;
}
