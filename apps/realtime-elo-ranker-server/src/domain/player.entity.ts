export class Player {
  constructor(
    public readonly id: string,
    public rank: number
  ) {}

  
  updateRank(newRank: number) {
    this.rank = newRank;
  }
}