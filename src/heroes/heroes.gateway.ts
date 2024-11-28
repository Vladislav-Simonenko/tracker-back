import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HeroService } from './heroes.service';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class HeroGateway {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => HeroService))
    private readonly heroService: HeroService,
  ) {}
  @SubscribeMessage('heroUpdated')
  async handleHeroUpdate(
    @MessageBody() heroId: number,
  ): Promise<WsResponse<any>> {
    const updatedHero = await this.heroService.getHeroById(heroId);
    return {
      event: 'heroUpdated',
      data: updatedHero,
    };
  }

  @SubscribeMessage('heroDeleted')
  async handleHeroDelete(
    @MessageBody() heroId: number,
  ): Promise<WsResponse<any>> {
    return {
      event: 'heroDeleted',
      data: { heroId },
    };
  }
}
