import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptor/serialize.interceptor';

interface ClassConstructor {
  new (...args: any[]): {};
}

function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export { Serialize };
