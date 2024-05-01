import { Get, Delete, Param, Body } from '@nestjs/common';
import { BaseService } from './base.service';
import { FilterQuery, ObjectId } from 'mongoose';

type Criteria<T> = FilterQuery<T>;

export class BaseController<T> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Get()
  async getAll() {
    const result = await this.baseService.getAll();
    return { message: 'GetAll', result: result };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.baseService.findById(id);
    return { message: 'findById', result: result };
  }

  @Get('search')
  async getByCriteria(@Body() criteria: Criteria<T>) {
    const result = await this.baseService.getByCriteria(criteria);
    return { message: 'getByCriteria', result: result };
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const result = await this.baseService.deleteById(id);
    return { message: 'deleteById', result: result };
  }
}
