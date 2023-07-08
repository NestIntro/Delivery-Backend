import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order/entity/order.entity';
import { Cart } from './cart/entity/cart.entity';
import { ConfigModule } from '@nestjs/config';

console.log(process.env.DB_NAME)
console.log(process.env.DB_PASSWORD)

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Order, Cart],
      // autoLoadEntities: true,
      synchronize: Boolean(process.env.DB_SYNC), // 개발에서만 사용해야 함
    }),
    OrderModule, CartModule],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService],
})
export class AppModule {}
