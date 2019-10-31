import { UsePipes, ValidationPipe } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsException, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server, Socket } from 'socket.io';
import { WithTime } from '../../interceptors/logging.interceptor';
import { IdentityDto } from './dto/identity';

@WebSocketGateway()
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('events')
    findAll(client: Client, data: any): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }

    @WithTime
    @UsePipes(new ValidationPipe())
    @SubscribeMessage('identity')
    async identity(client: Client, data: IdentityDto): Promise<number> {
        return data.id + 10;
    }

    @SubscribeMessage('exception')
    exception(client: Client, data: number) {
        throw new WsException('WsException testing');
    }
}
