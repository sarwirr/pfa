import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: {};
}

export const ExcludeTransformInterceptor =
  () => (target: any, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata('excludeInterceptor', true, descriptor.value);
    return descriptor;
  };

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const isExcluded = Reflect.getMetadata(
      'excludeInterceptor',
      context.getHandler(),
    );
    if (isExcluded) {
      return next.handle(); // Skip interception
    }

    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data.message,
        data: {
          result: data.result,
        },
      })),
    );
  }
}
