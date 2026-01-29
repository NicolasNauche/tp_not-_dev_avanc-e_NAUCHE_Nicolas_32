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

  processMatch(player1Id: string, player2Id: string, result: number) {
    const p1 = this.rankingService.getById(player1Id);
    const p2 = this.rankingService.getById(player2Id);

    const expectedP1 = Elo.calculateExpectedScore(p1.rank, p2.rank);
    const expectedP2 = Elo.calculateExpectedScore(p2.rank, p1.rank);

    const newRankP1 = Elo.calculateNewRank(p1.rank, expectedP1, result);
    const newRankP2 = Elo.calculateNewRank(p2.rank, expectedP2, 1 - result);

    p1.updateRank(newRankP1);
    p2.updateRank(newRankP2);

    this.gateway.sendUpdate(p1);
    this.gateway.sendUpdate(p2);

    return [p1, p2];
  }
}