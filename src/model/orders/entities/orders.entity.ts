import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type OrderDocument = Order & Document

@Schema({ timestamps: true })
export class Order extends Document{
    @Prop({ required: true })
    customerId: string;

    @Prop({ 
        type: [String],
        required: true 
    })
    productIds: string[];

    @Prop({ required: true })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);