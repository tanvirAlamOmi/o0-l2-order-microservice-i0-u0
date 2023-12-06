import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './entities';
import { Model } from 'mongoose'
import { OrderDto, UpdateDto } from './dto';

@Injectable()
export class OrdersService {
    
    constructor(
        @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
    ){}
    
    async create(orderDto: OrderDto): Promise<Order> {
        return (await new this.model({
          ...orderDto,
          createdAt: new Date(),
        }).save()).toJSON();
    }

    async findAll(): Promise<Order[]> {
        return await this.model.find().exec(); 
    }

    
    async findOne(id: string): Promise<Order> {
        let order = await this.model.findById(id).exec();
        if(!order) throw new NotFoundException('could not find the order.')
        return order.toJSON();
    }

    async findByProductname(productName: string): Promise<Order> {
        const order = await this.model.findOne({productName}).exec();
        if(!order) throw new NotFoundException('could not find the order.')
        return order.toJSON();
    }

    async findByQuery (query: object) : Promise<Order | undefined> {
        
        let order = await this.model.findOne(query);
        if(!order) throw new NotFoundException('could not find the order.')
        return order.toJSON();
    }

    async update(id: string, updateDto: Partial<UpdateDto>): Promise<OrderDto> {
        let order = await this.model.findOneAndUpdate({_id: id}, {$set: updateDto}, {new: true}).exec();
        if(!order) throw new NotFoundException('could not find the order.')
        return order.toJSON();
    }

    async delete(id: string): Promise<OrderDto> {
        let order = await this.model.findByIdAndDelete(id).exec();
        if(!order) throw new NotFoundException('could not find the order.')
        return order.toJSON();
    }
}
