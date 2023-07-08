import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    exports: [TypeOrmModule],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
