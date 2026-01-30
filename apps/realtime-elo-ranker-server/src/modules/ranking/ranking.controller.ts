
import { Controller, Get, Sse, MessageEvent } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { map, Observable, filter } from 'rxjs'; 

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  getRanking() {
    return this.rankingService.getAll();
  }

  @Sse('events')
  sendRankingEvents(): Observable<MessageEvent> {
    return this.rankingService.getRankingObservable().pipe(
      filter(players => players.length > 0),
      map((players) => {
        const lastPlayer = players[players.length - 1];

        return {
          data: {
            type: 'RankingUpdate',
            player: { id: lastPlayer.id, rank: lastPlayer.rank },
          },
        } as MessageEvent;
      })
    );
  }
}