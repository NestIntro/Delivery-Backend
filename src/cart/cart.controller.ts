import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entity/cart.entity';

@Controller('cart')
export class CartController {
    constructor(private CartService: CartService) {}

    @Get()
    findAll(): Promise<Cart[]> {
        return this.CartService.findAll();
    }

    @Post()
    create(@Body() cart: Cart) {
        return this.CartService.create(cart);
    }
}
