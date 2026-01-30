
import { Injectable } from '@nestjs/common';
import { Player } from '../../domain/player.entity';
import { BehaviorSubject, Observable, Subject } from 'rxjs'; 

@Injectable()
export class RankingService {
  private players: Map<string, Player> = new Map();
  private rankingSubject = new BehaviorSubject<Player[]>([]);
  
  private playerUpdateSubject = new Subject<Player>();

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

  getPlayerUpdateObservable(): Observable<Player> {
    return this.playerUpdateSubject.asObservable();
  }

  notifyUpdate(player: Player) {
    this.playerUpdateSubject.next(player);
    this.rankingSubject.next(this.getAll());
  }

  create(id: string): Player {
    const playersArr = this.getAll();
    const averageRank = playersArr.length > 0 
      ? Math.round(playersArr.reduce((sum, p) => sum + p.rank, 0) / playersArr.length)
      : 1200;
    
    const newPlayer = new Player(id, averageRank);
    this.players.set(id, newPlayer);
    
    this.notifyUpdate(newPlayer);
    
    return newPlayer;
  }
}