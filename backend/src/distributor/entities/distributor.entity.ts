import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DistributorDocument = Distributor & Document;

@Schema()
export class Distributor {
  _id;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  phone: string;

  @Prop()
  clientId: string;
}

const DistributorSchema = SchemaFactory.createForClass(Distributor);

export { DistributorSchema };
