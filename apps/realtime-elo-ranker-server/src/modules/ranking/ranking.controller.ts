
import { Controller, Get, Sse, MessageEvent } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { map, Observable } from 'rxjs'; 

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  getRanking() {
    return this.rankingService.getAll();
  }

  @Sse('events')
  sendRankingEvents(): Observable<MessageEvent> {
    return this.rankingService.getPlayerUpdateObservable().pipe(
      map((player) => ({
        data: {
          type: 'RankingUpdate',
          player: { id: player.id, rank: player.rank },
        },
      } as MessageEvent))
    );
  }
}