import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cart])],
    exports: [TypeOrmModule],
    providers: [CartService],
    controllers: [CartController]
})
export class CartModule {}
