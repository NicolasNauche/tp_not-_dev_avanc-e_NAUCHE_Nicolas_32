
import { Injectable } from '@nestjs/common';
import { RankingService } from '../ranking/ranking.service';
import { RankingGateway } from '../ranking/ranking.gateway';
import * as Elo from '../../domain/elo-logic';

@Injectable()
export class MatchService {
  constructor(
    private readonly rankingService: RankingService,
    private readonly gateway: RankingGateway
  ) {}

  processMatch(p1Id: string, p2Id: string, result: number) {
    const p1 = this.rankingService.getById(p1Id);
    const p2 = this.rankingService.getById(p2Id);

    const exp1 = Elo.calculateExpectedScore(p1.rank, p2.rank);
    const exp2 = Elo.calculateExpectedScore(p2.rank, p1.rank);

    p1.updateRank(Elo.calculateNewRank(p1.rank, exp1, result));
    p2.updateRank(Elo.calculateNewRank(p2.rank, exp2, 1 - result));


    this.rankingService.notifyUpdate(p1);
    this.rankingService.notifyUpdate(p2);

    this.gateway.sendUpdate(p1);
    this.gateway.sendUpdate(p2);

    return [p1, p2];
  }
}