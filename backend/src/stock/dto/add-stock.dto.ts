import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongoose';

class MedicineQuantityDTO {
  @IsNotEmpty()
  @IsMongoId()
  medicine: ObjectId;

  @IsNotEmpty()
  @IsNumber()
  quantity: Number;
}

export class AddStockDTO {
  @IsNotEmpty()
  @IsMongoId()
  ditributor: ObjectId;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => MedicineQuantityDTO)
  medicine_quantity: MedicineQuantityDTO[];
}
