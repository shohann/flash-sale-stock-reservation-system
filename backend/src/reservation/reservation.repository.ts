import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReservationStatus } from 'generated/prisma/browser';
import DatabaseService from '../database/database.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationRepository {
  constructor(private readonly db: DatabaseService) {}

  async createReservation(payload: CreateReservationDto) {
    return await this.db.$transaction(async (tx) => {
      const product = await tx.$queryRaw<
        Array<{
          id: number;
          name: string;
          price: number;
          available_stock: number;
          createdAt: Date;
          updatedAt: Date;
        }>
      >`SELECT * FROM "Product" WHERE id = ${payload.productId} FOR UPDATE`;

      if (!product.length) {
        throw new NotFoundException('Product not found');
      }

      const p = product[0];

      if (p.available_stock < payload.quantity) {
        throw new BadRequestException('Not enough stock');
      }

      await tx.$executeRaw`
      UPDATE "Product"
      SET available_stock = available_stock - ${payload.quantity}
      WHERE id = ${payload.productId}`;

      const now = new Date();
      const expiresAt = new Date(now.getTime() + 2 * 60 * 1000);

      const reservation = await tx.reservation.create({
        data: {
          product_id: payload.productId,
          expiredAt: expiresAt,
          status: ReservationStatus.Active,
          quantity: payload.quantity,
        },
      });

      return reservation;
    });
  }

  async markAsCompleted(id: number) {
    return await this.db.$transaction(async (tx) => {
      const reservation = await tx.$queryRaw<
        any[]
      >`SELECT * FROM "Reservation" WHERE id = ${id} FOR UPDATE`;

      if (
        !reservation.length ||
        reservation[0].status !== ReservationStatus.Active
      ) {
        return false;
      }

      await tx.reservation.update({
        where: { id },
        data: { status: ReservationStatus.Completed },
      });
      return true;
    });
  }

  async expireReservation(id: number) {
    return await this.db.$transaction(async (tx) => {
      const reservation = await tx.$queryRaw<any[]>`
        SELECT * FROM "Reservation" WHERE id = ${id} FOR UPDATE
      `;

      if (!reservation.length) return false;

      const r = reservation[0];

      if (r.status !== ReservationStatus.Active) return false;

      await tx.reservation.update({
        where: { id },
        data: { status: ReservationStatus.Expired },
      });

      await tx.$executeRaw`
        UPDATE "Product"
        SET available_stock = available_stock + ${r.quantity}
        WHERE id = ${r.product_id}
      `;

      return true;
    });
  }
}
