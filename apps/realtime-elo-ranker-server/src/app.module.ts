import { Module } from '@nestjs/common';
import { PlayerController } from './modules/player/player.controller';
import { MatchController } from './modules/match/match.controller';
import { RankingController } from './modules/ranking/ranking.controller';
import { RankingService } from './modules/ranking/ranking.service';
import { MatchService } from './modules/match/match.service';
import { RankingGateway } from './modules/ranking/ranking.gateway';

@Module({
  imports: [],
  controllers: [PlayerController, MatchController, RankingController],
  providers: [RankingService, MatchService, RankingGateway],
})
export class AppModule {}