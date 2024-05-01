import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddMedicineDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  reference: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
