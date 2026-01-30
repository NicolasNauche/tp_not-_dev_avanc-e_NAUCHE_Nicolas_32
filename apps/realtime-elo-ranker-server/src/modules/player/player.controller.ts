import { Controller, Post, Body } from '@nestjs/common';
import { RankingService } from '../ranking/ranking.service';
import { RankingGateway } from '../ranking/ranking.gateway'; //

@Controller('player')
export class PlayerController {
  // On injecte la RankingGateway pour pouvoir envoyer des messages en temps réel
  constructor(
    private readonly rankingService: RankingService,
    private readonly rankingGateway: RankingGateway 
  ) {}

  @Post()
  async create(@Body() body: { id: string }) {
    console.log('Requête reçue pour créer :', body);
    
    const newPlayer = await this.rankingService.create(body.id);
    
      
    this.rankingGateway.sendUpdate(newPlayer);
    
    return newPlayer;
  }
}