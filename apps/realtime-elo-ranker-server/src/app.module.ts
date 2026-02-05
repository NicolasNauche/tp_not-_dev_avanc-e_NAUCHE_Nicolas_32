import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; 
import { AppService } from './app.service';       
import { PlayerController } from './modules/player/player.controller';
import { MatchController } from './modules/match/match.controller';
import { RankingController } from './modules/ranking/ranking.controller';
import { RankingService } from './modules/ranking/ranking.service';
import { MatchService } from './modules/match/match.service';
import { RankingGateway } from './modules/ranking/ranking.gateway';

@Module({
  imports: [],
  controllers: [AppController, PlayerController, MatchController, RankingController],
  providers: [AppService, RankingService, MatchService, RankingGateway],
})
export class AppModule {}