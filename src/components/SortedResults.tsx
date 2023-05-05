import { useState, useMemo } from "react";
import ResultListing from "./ResultListing";

// * Sort by VoteFor
function sortByVoteFor(waifus: WaifusQueryResult): WaifusQueryResult {
  return [...waifus].sort((a, b) => b._count.VoteFor - a._count.VoteFor);
}

// * Sort by percentage of votes for
function sortByVotePercentage(waifus: WaifusQueryResult): WaifusQueryResult {
  return [...waifus].sort(
    (a, b) =>
      b._count.VoteFor / (b._count.VoteFor + b._count.VoteAgainst) -
      a._count.VoteFor / (a._count.VoteFor + a._count.VoteAgainst),
  );
}

interface SortedResultsProps {
  waifus: WaifusQueryResult | null;
}

const SortedResults: React.FC<SortedResultsProps> = ({ waifus }) => {
  const [sortedBy, setSortedBy] = useState<"perc" | "votes">("perc");

  const byVotes = useMemo(() => sortByVoteFor(waifus ?? []), [waifus]);
  const byPercent = useMemo(() => sortByVotePercentage(waifus ?? []), [waifus]);
  // const byVotes = sortByVoteFor(waifus ?? []);
  // const byPercent = sortByVotePercentage(waifus ?? []);

  // if (typeof window === "undefined") return null;

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-center text-4xl">Results</div>
        <div className="text-center text-lg">
          Sorted by{" "}
          <span
            onClick={() => setSortedBy("perc")}
            style={{ textDecoration: sortedBy === "perc" ? "underline" : "" }}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            percentage
          </span>
          {" or "}
          <span
            onClick={() => setSortedBy("votes")}
            style={{ textDecoration: sortedBy === "votes" ? "underline" : "" }}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            votes
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4">
        <ul className="flex w-full max-w-2xl flex-col border">
          {sortedBy === "perc"
            ? byPercent.map((curWaifu, idx) => (
                <ResultListing
                  key={curWaifu.id.toString() + "perc"}
                  waifu={curWaifu}
                  rank={idx + 1}
                />
              ))
            : byVotes.map((curWaifu, idx) => (
                <ResultListing
                  key={curWaifu.id.toString() + "votes"}
                  waifu={curWaifu}
                  rank={idx + 1}
                />
              ))}
        </ul>
      </div>
    </>
  );
};

export default SortedResults;
