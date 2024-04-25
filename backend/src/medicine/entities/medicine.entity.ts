import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MedicineDocument = Medicine & Document;

@Schema()
export class Medicine {
  _id;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  reference: string;

  @Prop()
  price: number;
}

const MedicineSchema = SchemaFactory.createForClass(Medicine);

export { MedicineSchema };
