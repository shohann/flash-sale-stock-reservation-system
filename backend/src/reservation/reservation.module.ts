import { Module } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { ReservationQueue } from './reservation.queue';
import { ReservationRepository } from './reservation.repository';
import { ReservationWorker } from './reservation.worker';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'reservation-expire',
    }),
  ],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationRepository,
    ReservationQueue,
    ReservationWorker,
    DatabaseService,
  ],
})
export class ReservationModule {}
