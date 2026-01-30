import { Controller, Post, Body, Get } from '@nestjs/common';
import { RankingService } from '../ranking/ranking.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly rankingService: RankingService) {}

  @Post()
  async create(@Body() body: { id: string }) {
    console.log('Requête reçue pour créer :', body);
    return this.rankingService.create(body.id);
  }
}