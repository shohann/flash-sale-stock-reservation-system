import { Controller, Post, Param, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() body: CreateReservationDto) {
    return this.reservationService.create(body);
  }

  @Post(':id/complete')
  async complete(@Param('id') id: string) {
    return this.reservationService.complete(Number(id));
  }
}
