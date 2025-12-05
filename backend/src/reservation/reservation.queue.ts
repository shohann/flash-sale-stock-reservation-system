import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { redisConnection } from 'src/queues/bullmq.module';

@Injectable()
export class ReservationQueue {
  queue: Queue;

  constructor() {
    this.queue = new Queue('reservation-expire', {
      connection: redisConnection,
    });
  }

  async addExpirationJob(reservationId: number) {
    await this.queue.add('expire', { reservationId }, { delay: 2 * 60 * 1000 });
  }
}
