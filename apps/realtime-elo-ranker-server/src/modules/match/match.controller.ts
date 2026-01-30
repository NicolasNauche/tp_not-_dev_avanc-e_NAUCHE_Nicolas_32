import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  addResult(@Body() body: { winner: string, loser: string, draw: boolean }) {
  
    const player1Id = body.winner;
    const player2Id = body.loser;
    const result = body.draw ? 0.5 : 1;

    return this.matchService.processMatch(player1Id, player2Id, result);
  }
}