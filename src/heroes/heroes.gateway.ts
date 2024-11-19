import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3030) // Порт, на котором WebSocket сервер будет работать
export class HeroesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ' + client.id);
  }

  @SubscribeMessage('updateHeroes')
  handleUpdateHeroes(@MessageBody() data: any): void {
    console.log('Heroes update data received:', data);
    this.server.emit('heroesUpdated', data); // Отправляем данные всем подключенным клиентам
  }
}
