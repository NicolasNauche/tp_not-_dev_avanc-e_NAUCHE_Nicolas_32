import { Controller, Post, Body, Get } from '@nestjs/common';
import { RankingService } from '../ranking/ranking.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly rankingService: RankingService) {}

  @Post()
  create(@Body('id') id: string) {
    return this.rankingService.create(id);
  }
}