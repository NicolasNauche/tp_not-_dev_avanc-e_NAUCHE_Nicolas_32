import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  addResult(@Body() body: { player1Id: string, player2Id: string, result: number }) {
    return this.matchService.processMatch(body.player1Id, body.player2Id, body.result);
  }
}