import { ObjectId } from 'mongoose';

export type Medicine_quantity = {
  medicine: ObjectId;
  quantity: Number;
};
