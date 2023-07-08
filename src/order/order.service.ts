import { Injectable } from '@nestjs/common';
// import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
    ){}

    findAll(): Promise<Order[]> {
        return this.ordersRepository.find();
    }

    // findOne(id: number): Promise<Order> {
    //     return this.ordersRepository.findOne(id);
    // }

    async create(order: Order): Promise<void> {
        await this.ordersRepository.save(order);
    }

    async remove(id: number): Promise<void> {
        await this.ordersRepository.delete(id);
    }
}
