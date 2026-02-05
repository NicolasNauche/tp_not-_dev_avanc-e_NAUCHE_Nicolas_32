import { calculateExpectedScore, calculateNewRank, K_FACTOR } from './elo-logic';

describe('Elo Logic', () => {
  describe('calculateExpectedScore', () => {
    it('doit retourner 0.5 si les deux joueurs ont le même rang', () => {
      const score = calculateExpectedScore(1000, 1000);
      expect(score).toBeCloseTo(0.5);
    });

    it('doit donner un score > 0.5 si le joueur A est mieux classé', () => {
      const score = calculateExpectedScore(1200, 1000);
      expect(score).toBeGreaterThan(0.5);
    });

    it('doit donner un score < 0.5 si le joueur A est moins bien classé', () => {
      const score = calculateExpectedScore(1000, 1200);
      expect(score).toBeLessThan(0.5);
    });
  });

  describe('calculateNewRank', () => {
    it('doit augmenter le rang après une victoire contre un adversaire égal', () => {
      const currentRank = 1000;
      const expectedScore = 0.5; // 50% de chance de gagner
      const actualScore = 1;     // Victoire
      
      const newRank = calculateNewRank(currentRank, expectedScore, actualScore);
      
      // Calcul attendu : 1000 + 32 * (1 - 0.5) = 1000 + 16 = 1016
      expect(newRank).toBe(1016);
    });

    it('doit diminuer le rang après une défaite contre un adversaire égal', () => {
      const currentRank = 1000;
      const expectedScore = 0.5;
      const actualScore = 0;     // Défaite
      
      const newRank = calculateNewRank(currentRank, expectedScore, actualScore);
      
      // Calcul attendu : 1000 + 32 * (0 - 0.5) = 1000 - 16 = 984
      expect(newRank).toBe(984);
    });

    it('doit ne pas changer le rang en cas de nul parfaitement prédit', () => {
      const currentRank = 1000;
      const expectedScore = 0.5;
      const actualScore = 0.5;   // Match nul
      
      const newRank = calculateNewRank(currentRank, expectedScore, actualScore);
      expect(newRank).toBe(1000);
    });
    
    it('doit utiliser le bon facteur K', () => {
      // Ce test vérifie indirectement que K_FACTOR est bien utilisé (ici 32)
      // Si on a 100% de chance de perdre (exp=0) mais qu'on gagne (act=1), on gagne K points max
      const change = calculateNewRank(1000, 0, 1) - 1000;
      expect(change).toBe(K_FACTOR);
    });
  });
});