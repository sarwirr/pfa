import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pharmacy = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const pharmacy = request.pharmacy;

    return data ? pharmacy?.[data] : pharmacy;
  },
);
