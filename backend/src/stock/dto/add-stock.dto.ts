import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: String, description: 'Mongoose ObjectId' })
  @IsNotEmpty()
  @IsMongoId()
  medicine: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: Number;
}

export class AddStockDTO {
  @ApiProperty({ type: String, description: 'Mongoose ObjectId' })
  @IsNotEmpty()
  @IsMongoId()
  distributor: ObjectId;

  @ApiProperty({ type: () => MedicineQuantityDTO })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MedicineQuantityDTO)
  medicine_quantity: MedicineQuantityDTO[];
}
