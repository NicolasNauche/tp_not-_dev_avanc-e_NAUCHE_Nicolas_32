import { Module } from '@nestjs/common';
import { RankingService } from './modules/ranking/ranking.service';
import { RankingGateway } from './modules/ranking/ranking.gateway';
import { RankingController } from './modules/ranking/ranking.controller';
import { PlayerController } from './modules/player/player.controller';
import { MatchController } from './modules/match/match.controller';
import { MatchService } from './modules/match/match.service';

@Module({
  imports: [],
  controllers: [PlayerController, MatchController, RankingController],
  providers: [RankingService, MatchService, RankingGateway],
})
export class AppModule {}