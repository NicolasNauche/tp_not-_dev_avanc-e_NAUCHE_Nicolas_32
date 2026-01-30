import { Injectable } from '@nestjs/common';
import { Player } from '../../domain/player.entity';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RankingService {
  private players: Map<string, Player> = new Map();
  private rankingSubject = new BehaviorSubject<Player[]>([]);

  getAll(): Player[] {
    return Array.from(this.players.values()).sort((a, b) => b.rank - a.rank);
  }

  getById(id: string): Player {
    const player = this.players.get(id);
    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }
    return player;
  }

  getRankingObservable(): Observable<Player[]> {
    return this.rankingSubject.asObservable();
  }

  create(id: string): Player {
    const playersArr = this.getAll();
    const averageRank = playersArr.length > 0 
      ? Math.round(playersArr.reduce((sum, p) => sum + p.rank, 0) / playersArr.length)
      : 1200;
    
    const newPlayer = new Player(id, averageRank);
    this.players.set(id, newPlayer);
    
    this.rankingSubject.next(this.getAll());
    
    return newPlayer;
  }
}