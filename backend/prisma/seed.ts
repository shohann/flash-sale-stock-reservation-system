import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
async function main() {
  const productData = [
    { name: 'Laptop Pro', price: 1200.0, available_stock: 15 },
    { name: 'Mechanical Keyboard', price: 99.5, available_stock: 30 },
    { name: 'Ergonomic Mouse', price: 45.0, available_stock: 50 },
  ];

  for (const p of productData) {
    await prisma.product.create({
      data: p,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
