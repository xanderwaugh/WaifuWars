import { useMemo } from "react";
import ResultListing from "./ResultListing";

// Sort by VoteFor
function sortByVoteFor(waifus: WaifusQueryResult): WaifusQueryResult {
  return [...waifus].sort((a, b) => b._count.VoteFor - a._count.VoteFor);
}

// Sort by percentage of votes for
function sortByVotePercentage(waifus: WaifusQueryResult): WaifusQueryResult {
  return [...waifus].sort(
    (a, b) =>
      b._count.VoteFor / (b._count.VoteFor + b._count.VoteAgainst) -
      a._count.VoteFor / (a._count.VoteFor + a._count.VoteAgainst),
  );
}

interface SortedResultsProps {
  waifus: WaifusQueryResult;
  sortedBy: "perc" | "votes";
}

const SortedResults: React.FC<SortedResultsProps> = ({ waifus, sortedBy }) => {
  const byVotes = useMemo(() => sortByVoteFor(waifus), [waifus]);
  const byPercent = useMemo(() => sortByVotePercentage(waifus), [waifus]);

  return (
    <ul className="flex w-full max-w-2xl flex-col border">
      {sortedBy === "perc"
        ? byPercent.map((curWaifu, idx) => (
            <ResultListing waifu={curWaifu} key={curWaifu.id} rank={idx + 1} />
          ))
        : byVotes.map((curWaifu, idx) => (
            <ResultListing waifu={curWaifu} key={curWaifu.id} rank={idx + 1} />
          ))}
    </ul>
  );
};

export default SortedResults;
