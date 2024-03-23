import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, ObjectId } from 'mongoose';

type Criteria<T> = FilterQuery<T>;

@Injectable()
export class BaseService<T extends Document> {
    constructor(
        private BaseModel: Model<T>,
        ){}
    

    async getAll(): Promise<T[]>{
        return await this.BaseModel.find();
    }

    async findById(id:ObjectId): Promise<T[]|null>{
        return await this.BaseModel.findById(id);
    }

    async getByCriteria(criteria: Criteria<T>): Promise<T|null>{
        return (await this.BaseModel.findOne(criteria).exec());
    }

    async deleteById(id:ObjectId):Promise<T | null>{
        return (await this.BaseModel.findByIdAndDelete(id).exec())    
    }
    
}
