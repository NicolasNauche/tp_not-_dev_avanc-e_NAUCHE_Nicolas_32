export const K_FACTOR = 32;


export const calculateExpectedScore = (rankA: number, rankB: number): number => {
  return 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
};


export const calculateNewRank = (currentRank: number, expectedScore: number, actualScore: number): number => {
  return Math.round(currentRank + K_FACTOR * (actualScore - expectedScore));
};