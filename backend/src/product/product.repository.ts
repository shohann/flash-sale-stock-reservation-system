import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { Product } from 'generated/prisma/browser';

@Injectable()
export class ProductRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.db.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }
}
