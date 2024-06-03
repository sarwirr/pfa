import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';

export type DistributorDocument = Distributor & Document;

@Schema()
export class Distributor extends Pharmacy {
  @Prop()
  telephone: string;

  @Prop()
  horaire: string[];
}

const DistributorSchema = SchemaFactory.createForClass(Distributor);

export { DistributorSchema };
