import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PharmacyDocument = Pharmacy & Document;

@Schema()
export class Pharmacy {
    _id;

    @Prop({ required: true })
    name: string;

    @Prop()
    address: string;

    @Prop()
    city: string;

    @Prop()
    phone: string;

    // @Prop()
    // email: string;

    // @Prop({ required: true })
    // password: string;


}

const PharmacySchema = SchemaFactory.createForClass(Pharmacy);

export { PharmacySchema }
