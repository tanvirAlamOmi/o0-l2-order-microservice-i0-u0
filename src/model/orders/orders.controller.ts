import { Controller, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Order } from './entities';
import { OrderDto } from './dto';

@Controller('orders')
export class OrdersController {
    constructor( private readonly ordersService: OrdersService ) {}
    
    @MessagePattern('getOrders')
    // @UseGuards(RolesGuard)
    // @Roles(RolesEnum.ADMIN, RolesEnum.USER)
    async getAll(): Promise<Order[]> {
        return await this.ordersService.findAll(); 
    } 

    @MessagePattern('createOrder')
    create( @Body() productDto: OrderDto ): Promise<Order> {
        return this.ordersService.create(productDto);
    }
    
}
