import { type WaifusQueryResult } from "~/types";

// Sort By VotesFor - Ascending
export const sortByVotes = (w: WaifusQueryResult) => {
  const arr = w.sort((a, b) => b._count.VoteFor - a._count.VoteFor);
  return arr;
};

export const sortPerc = (
  a: WaifusQueryResult[number],
  b: WaifusQueryResult[number],
) =>
  b._count.VoteFor / (b._count.VoteFor + b._count.VoteAgainst) -
  a._count.VoteFor / (a._count.VoteFor + a._count.VoteAgainst);

export const sortByPerc = (w: WaifusQueryResult) => {
  const arr = w.sort((a, b) => {
    const bPerc = b._count.VoteFor / (b._count.VoteFor + b._count.VoteAgainst);
    const aPerc = a._count.VoteFor / (a._count.VoteFor + a._count.VoteAgainst);
    if (bPerc === aPerc) return b._count.VoteFor - a._count.VoteFor;
    return bPerc - aPerc;
  });
  return arr;
};
