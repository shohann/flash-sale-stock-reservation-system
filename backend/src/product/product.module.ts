import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import DatabaseService from '../database/database.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, DatabaseService],
  exports: [ProductService],
})
export class ProductsModule {}
