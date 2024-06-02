import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Orderstatus } from 'src/common/enum/status.enum';
import { Medicine_quantity } from 'src/common/types/type';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  _id;

  @Prop({ type: String, ref: 'Pharmacy' })
  pharmacy: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Distributor' })
  distributor: ObjectId;

  @Prop(
    raw([
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
        quantity: { type: Number },
        medicineTotalPrice: { type: Number },
      },
    ]),
  )
  medicine_quantity: Medicine_quantity[];

  @Prop({ default: false })
  confirmation: Boolean;

  @Prop({ type: String, enum: Orderstatus, default: Orderstatus.NotConfirmed })
  status: Orderstatus;

  @Prop()
  total_price: number;
}

const OrderSchema = SchemaFactory.createForClass(Order);

export { OrderSchema };
