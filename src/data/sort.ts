// * Sort By VotesFor - Ascending
export const sortByVotes = (w: WaifusQueryResult) => {
  const arr = [...w].sort((a, b) => b._count.VoteFor - a._count.VoteFor);
  return arr;
};

// * Get Percentage Of When Voted For
export const getPercentage = (waifu: PrismaWaifuQNoBio) => {
  const total = waifu._count.VoteFor + waifu._count.VoteAgainst;
  const perc = (waifu._count.VoteFor / total) * 100;
  return perc;
};

// * Sort By Percentage Magic
export const sortByPerc = (w: WaifusQueryResult) => {
  const arr = [...w].sort((a, b) => {
    const bPerc = b._count.VoteFor / (b._count.VoteFor + b._count.VoteAgainst);
    const aPerc = a._count.VoteFor / (a._count.VoteFor + a._count.VoteAgainst);
    if (bPerc === aPerc) return b._count.VoteFor - a._count.VoteFor;
    return bPerc - aPerc;
  });
  return arr;
};

type Waifu = PrismaWaifuQNoBio;

const engagement = (waifu: Waifu) => {
  return waifu._count.VoteFor + waifu._count.VoteAgainst;
};

function calculateScore(waifu: Waifu): number {
  // * Weight for each criteria
  const weight = 0.3;

  // * Calculate the percentage of votes in favor
  const percInFavor = getPercentage(waifu);

  // * Calculate the total engagement
  const total = engagement(waifu);

  // * Assign a score based on the criteria (you can adjust weights as needed)
  const score = percInFavor * weight + total * (1 - weight);

  return score;
}

// * Sort using test algorithm
export function sortByTest(w: WaifusQueryResult): WaifusQueryResult {
  const arr = [...w].map((waifu) => {
    return {
      ...waifu,
      engagement: engagement(waifu),
      score: calculateScore(waifu),
    };
  });

  // * Sort characters based on the calculated score
  return [...arr].sort((a, b) => b.score + a.score);
}
