import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Distributor = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const distributor = request.distributor;

    return data ? distributor?.[data] : distributor;
  },
);
