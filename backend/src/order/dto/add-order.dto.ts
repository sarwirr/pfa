import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongoose';

class MedicineQuantityDTO {
  @ApiProperty({ type: String, description: 'Mongoose ObjectId' })
  @IsNotEmpty()
  @IsMongoId()
  medicine: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  medicineTotalPrice: number;
}

export class AddOrderDto {
  // @ApiProperty({ type: String, description: 'Mongoose ObjectId' })
  // @IsNotEmpty()
  // @IsMongoId()
  // pharmacy: ObjectId;

  @ApiProperty({ type: String, description: 'Mongoose ObjectId' })
  @IsNotEmpty()
  @IsMongoId()
  distributor: string;

  @ApiProperty({ type: () => [MedicineQuantityDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MedicineQuantityDTO)
  medicine_quantity: MedicineQuantityDTO[];
}
