import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'generated/prisma/browser';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
