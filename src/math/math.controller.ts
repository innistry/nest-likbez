import { Controller, Inject, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { WithTime } from '../logging.interceptor';
import { MATH_SERVICE } from './math.constants';
import { Observable } from 'rxjs';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('math')
@ApiUseTags('math')
export class MathController {
    constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

    @Post('microservice')
    execute(): Observable<number> {
        this.client.emit<number>(
            'accumulateEvent',
            [1, 2, 3, 4, 5],
        );

        return this.client.send<number>(
            'accumulateMessage',
            [1, 2, 3, 4, 5],
        );
    }

    @MessagePattern('accumulateMessage')
    @UsePipes(new ValidationPipe())
    @WithTime
    async accumulateMessage(data: number[]): Promise<number> {
        Logger.log(`accumulateMessage ${data}`);
        return (data || []).reduce((a, b) => a + b);
    }

    @EventPattern('accumulateEvent')
    async accumulateEvent(data: number[]) {
        Logger.log(`accumulateEvent ${data}`);
    }
}
