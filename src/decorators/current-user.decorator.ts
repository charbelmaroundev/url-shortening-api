import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IRequest } from '../models';

export const CurrentUser = createParamDecorator(
  (data: never | undefined, context: ExecutionContext) => {
    const request: IRequest = context.switchToHttp().getRequest();

    return request.user;
  },
);
