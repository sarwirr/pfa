import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type PharmacyDocument = Pharmacy & Document;

@Schema()
export class Pharmacy {
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

const PharmacySchema = SchemaFactory.createForClass(Pharmacy);

export { PharmacySchema };

