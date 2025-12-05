import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
import { redisConnection } from 'src/queues/bullmq.module';
import { Processor, WorkerHost } from '@nestjs/bullmq';

@Processor('reservation-expire', { connection: redisConnection })
@Injectable()
export class ReservationWorker extends WorkerHost {
  constructor(private readonly reservationRepo: ReservationRepository) {
    super();
  }

  async process(job: any) {
    const id = job.data.reservationId;
    await this.reservationRepo.expireReservation(id);
  }
}
