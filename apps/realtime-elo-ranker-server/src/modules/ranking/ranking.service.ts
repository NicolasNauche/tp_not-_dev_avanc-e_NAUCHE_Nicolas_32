import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from '../../domain/player.entity';

@Injectable()
export class RankingService {
  private players: Map<string, Player> = new Map();

  getAll(): Player[] {
    return Array.from(this.players.values()).sort((a, b) => b.rank - a.rank);
  }

  getById(id: string): Player {
    const player = this.players.get(id);
    if (!player) throw new NotFoundException(`Joueur ${id} non trouvé`);
    return player;
  }

  create(id: string): Player {
    const playersArr = this.getAll();
    const averageRank = playersArr.length > 0 
      ? Math.round(playersArr.reduce((sum, p) => sum + p.rank, 0) / playersArr.length)
      : 1200;
    
    const newPlayer = new Player(id, averageRank);
    this.players.set(id, newPlayer);
    return newPlayer;
  }
}