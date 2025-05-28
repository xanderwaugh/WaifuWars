"use client";

import { Fragment } from "react";

import { useWaifuContext } from "~/components/utils/context";
import { sortByPerc, sortByVotes } from "~/data/sort";
import { ResultListing } from "./listing";

interface ResultsProps {
  waifus?: WaifusQueryResult;
}

// * I want to get the types of the sort functions and use them to generate the sort options
const typeOfSorts = ["perc", "votes"] as const; // , "test"

const Results: React.FC<ResultsProps> = ({ waifus: initialWaifus }) => {
  const { sort, setSort } = useWaifuContext();

  const byPerc = sortByPerc(initialWaifus ?? []);
  const byVotes = sortByVotes(initialWaifus ?? []);
  // const byTest = sortByTest(initialWaifus);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 pb-8">
        <h1 className="text-center text-4xl">Results</h1>
        <div className="text-center text-lg">
          Sorted by{" "}
          {typeOfSorts.map((curSort, idx) => (
            <Fragment key={`${curSort}-${idx.toString()}`}>
              <span
                onClick={() => setSort(curSort)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSort(curSort);
                  }
                }}
                style={{
                  textDecoration: sort === curSort ? "underline" : undefined,
                }}
                className="cursor-pointer text-blue-500 hover:underline"
              >
                {curSort}
              </span>
              {idx === typeOfSorts.length - 1 ? "" : " or "}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4">
        <ul className="flex w-full max-w-2xl flex-col border">
          {sort === "perc" &&
            byPerc.map((curWaifu, idx) => (
              <ResultListing
                key={`${curWaifu.id.toString()}-perc`}
                waifu={curWaifu}
                rank={idx + 1}
              />
            ))}

          {sort == "votes" &&
            byVotes.map((curWaifu, idx) => (
              <ResultListing
                key={`${curWaifu.id.toString()}-votes`}
                waifu={curWaifu}
                rank={idx + 1}
              />
            ))}

          {/* {sort === "test" &&
            byTest.map((curWaifu, idx) => (
              <ResultListing
                key={`${curWaifu.id}-test`}
                waifu={curWaifu}
                rank={idx + 1}
              />
            ))} */}
        </ul>
      </div>
    </>
  );
};

export default Results;
