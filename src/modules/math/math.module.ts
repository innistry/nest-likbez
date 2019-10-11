import { Module } from '@nestjs/common';
import { MathController } from './math.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MATH_SERVICE } from './math.constants';

@Module({
  imports: [
    ClientsModule.register([{
      name: MATH_SERVICE,
      transport: Transport.REDIS,
      options: {
        retryAttempts: 5,
        retryDelay: 3000,
        url: 'redis://localhost:6379',
      },
    }]),
  ],
  controllers: [MathController],
})
export class MathModule {}