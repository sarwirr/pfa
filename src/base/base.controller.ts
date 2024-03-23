import { Get,Delete, Param, Body } from '@nestjs/common';
import { BaseService } from './base.service';
import { FilterQuery, ObjectId } from 'mongoose';

type Criteria<T> = FilterQuery<T>;

export class BaseController<T extends Document> {
    constructor(
        private readonly baseService : BaseService<T>
    ){}

    @Get()
    async getAll(): Promise<T[]> {
        return await this.baseService.getAll();
    }

    @Get(':id')
    async findById(@Param('id') id: ObjectId): Promise<T[] | null> {
        return await this.baseService.findById(id);
    }

    @Get('search')
    async getByCriteria(@Body() criteria: Criteria<T>): Promise<T | null> {
        return await this.baseService.getByCriteria(criteria);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: ObjectId): Promise<T | null> {
        return await this.baseService.deleteById(id);
    }
}
