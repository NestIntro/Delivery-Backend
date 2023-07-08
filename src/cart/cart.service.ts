import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartsRepository: Repository<Cart>,
    ){}

    findAll(): Promise<Cart[]> {
        return this.cartsRepository.find();
    }

    async create(cart: Cart): Promise<void> {
        await this.cartsRepository.save(cart);
    }
}
