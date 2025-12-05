import { Global, Module } from '@nestjs/common';
import { RedisOptions } from 'ioredis';

export const redisConnection: RedisOptions = {
  host: 'localhost',
  port: 6379,
};

@Global()
@Module({})
export class BullMQModule {}
