import { Module } from '@nestjs/common';
import { ProductsModule } from './product/product.module';
import DatabaseModule from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    ProductsModule,
    ReservationModule,
  ],
})
export class AppModule {}
