import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class RankingGateway {
  @WebSocketServer()
  server: Server;

  sendUpdate(player: { id: string; rank: number }) {
    this.server.emit('RankingUpdate', {
      player: {
        id: player.id,
        rank: player.rank
      }
    });
  }
}