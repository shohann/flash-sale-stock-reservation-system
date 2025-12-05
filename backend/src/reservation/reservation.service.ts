import { BadRequestException, Injectable } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
import { ReservationQueue } from './reservation.queue';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    private readonly reservationQueue: ReservationQueue,
  ) {}

  async create(payload: CreateReservationDto) {
    const reservation = await this.reservationRepo.createReservation(payload);

    await this.reservationQueue.addExpirationJob(reservation.id);

    return reservation;
  }

  async complete(id: number) {
    const success = await this.reservationRepo.markAsCompleted(id);
    if (!success)
      throw new BadRequestException('Reservation cannot be completed');
    return { message: 'Completed' };
  }
}
