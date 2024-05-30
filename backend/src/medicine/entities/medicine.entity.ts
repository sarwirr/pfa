import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

export type MedicineDocument = Medicine & Document;

@Schema()
export class Medicine {
  _id;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  reference: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Distributor' })
  distributor: ObjectId[];
}

const MedicineSchema = SchemaFactory.createForClass(Medicine);

export { MedicineSchema };
