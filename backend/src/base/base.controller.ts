import { Get, Delete, Param, Body } from '@nestjs/common';
import { BaseService } from './base.service';
import { FilterQuery, ObjectId } from 'mongoose';
import { ApiOperation } from '@nestjs/swagger';

type Criteria<T> = FilterQuery<T>;

export class BaseController<T> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Get()
  @ApiOperation({ summary: 'Get all objects' })
  async getAll() {
    const result = await this.baseService.getAll();
    return { message: 'GetAll', result: result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find by Id object' })
  async findById(@Param('id') id: string) {
    const result = await this.baseService.findById(id);
    return { message: 'findById', result: result };
  }

  @Get('search')
  @ApiOperation({ summary: 'Get by criteria' })
  async getByCriteria(@Body() criteria: Criteria<T>) {
    const result = await this.baseService.getByCriteria(criteria);
    return { message: 'getByCriteria', result: result };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete object' })
  async deleteById(@Param('id') id: string) {
    const result = await this.baseService.deleteById(id);
    return { message: 'deleteById', result: result };
  }
}
