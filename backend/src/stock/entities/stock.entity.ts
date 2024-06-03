import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Medicine_quantity } from 'src/common/types/type';

export type StockDocument = Stock & Document;

@Schema()
export class Stock {
  _id;

  @Prop({ type: String, ref: 'Distributor' })
  distributor: string;

  @Prop(
    raw([
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
        quantity: { type: Number },
      },
    ]),
  )
  medicine_quantity: Medicine_quantity[];
}

const StockSchema = SchemaFactory.createForClass(Stock);

export { StockSchema };
