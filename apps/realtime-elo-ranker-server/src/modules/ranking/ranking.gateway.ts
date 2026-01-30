
import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RankingService } from './ranking.service'; // Importer le service

@WebSocketGateway({ cors: { origin: '*' } })
export class RankingGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly rankingService: RankingService) {}

  afterInit() {
    this.rankingService.getRankingObservable().subscribe((players) => {
      if (this.server) {
        this.server.emit('RankingUpdate', players);
      }
    });
  }

  sendUpdate(player: any) {
 
    this.server.emit('PlayerUpdate', {
      player: { id: player.id, rank: player.rank }
    });
  }
}