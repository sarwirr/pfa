import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, ObjectId } from 'mongoose';

type Criteria<T> = FilterQuery<T>;

export class BaseService<T> {
  constructor(private BaseModel: Model<T>, private baseDTO?) {}

  async save(baseDto) {
    try {
      const entity = await this.BaseModel.create(baseDto);
      return entity.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<T[]> {
    try {
      return await this.BaseModel.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<T[] | null> {
    try {
      return await this.BaseModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getByCriteria(criteria: Criteria<T>): Promise<T | null> {
    try {
      return await this.BaseModel.findOne(criteria).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(id: string): Promise<T | null> {
    try {
      return await this.BaseModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
