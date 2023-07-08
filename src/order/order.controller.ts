import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
// import { Order } from './order_type.module';
// import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';

@Controller('order') // 주문 생성, 주문 조회
export class OrderController {
    constructor(private OrderService: OrderService) {}

    @Get()
    findAll(): Promise<Order[]> {
        return this.OrderService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: number): Promise<Order> {
    //     return this.OrderService.findOne(id);
    // }

    @Post()
    create(@Body() order: Order) {
        return this.OrderService.create(order);
    }

    @Delete()
    remove(@Param('id') id:number) {
        this.OrderService.remove(id);
    }

    // @Get()
    // getAllOrder(): Order[]{
    //     return this.OrderService.getAllOrders();
    // }

    // @Post()
    // createOrder(
    //     @Body() createOrderDto: CreateOrderDto
    //     ):Order {
    //         return this.OrderService.createOrder(createOrderDto);
    // }
    

    

}
