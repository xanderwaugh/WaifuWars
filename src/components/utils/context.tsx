"use client";

// import "client-only";
import { createContext, use, useEffect, useState } from "react";

import type { WaifuPair } from "~/validators/pair";
import { getBaseUrl } from "~/lib";
import { getLocalStorage, setLocalStorage } from "~/lib/storage";
import { pairSchema } from "~/validators/pair";
import { votesSchema } from "~/validators/vote";

interface ContextProps {
  // * Function to add a vote
  addVote: (vote: Vote) => void;
  // * Total number of votes
  numVotes: number;
  // * List of votes
  votes: Vote[];
  // * Number between 0 and 1
  // accuracy: number;
  // * What the Results are sorted by
  sort: Sort;
  // * Set the sort
  setSort: (sort: Sort) => void;
  // * Loading state
  loading: boolean;
  // * Set the loading state
  setLoading: (loading: boolean) => void;
  // * The current pair
  pair: WaifuPair | null;
  // * Set the pair
  setPair: (pair: WaifuPair) => void;
  // * The next pair
  nextPair: WaifuPair | null;
  // * Set the next pair
  setNextPair: (pair: WaifuPair | null) => void;
  // * Get new next pair
  getNextPair: () => void;
}

// Initial Context without addVote or setSort
type InitialContext = Omit<
  ContextProps,
  | "addVote"
  | "setSort"
  | "setLoading"
  | "setPair"
  | "setNextPair"
  | "getNextPair"
>;

const getInitialContext: () => InitialContext = () => {
  if (typeof window === "undefined") return defaults;

  // let numVotes = Number(localStorage.getItem("numVotes"));
  // if (isNaN(numVotes)) numVotes = 0;

  const rawVotes = localStorage.getItem("votes") ?? "[]";
  // const votes = JSON.parse(rawVotes) as Vote[];

  const parsedVotes = votesSchema.safeParse(JSON.parse(rawVotes));
  const votes = parsedVotes.success ? parsedVotes.data : [];

  const numVotes = getLocalStorage<number>("numVotes", 0);
  const sort = getLocalStorage<Sort>("sort", "votes");

  const loading = false;

  return {
    numVotes,
    votes,
    sort,
    loading,
    pair: null,
    nextPair: null,
  };
};

const defaults: InitialContext = {
  numVotes: 0,
  votes: [],
  sort: "votes",
  loading: false,
  pair: null,
  nextPair: null,
};

export const WaifuContext = createContext<ContextProps>({
  addVote: () => undefined,
  setSort: () => undefined,
  setLoading: () => undefined,
  setPair: () => undefined,
  setNextPair: () => undefined,
  getNextPair: () => undefined,
  ...defaults,
});

interface ProviderProps {
  children: React.ReactNode;
}

export const WaifuProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, setState] = useState<InitialContext>(defaults);

  const addVote = (_vote: Vote) => {
    setState((p) => {
      const numVotes = p.numVotes + 1;
      const votes: Vote[] = []; // [...p.votes, vote];

      setLocalStorage("numVotes", numVotes.toString());
      // setLocalStorage("votes", JSON.stringify(votes));
      return { ...p, numVotes, votes };
    });
  };

  const setSort = (sort: Sort) => {
    setState((p) => {
      setLocalStorage("sort", sort);
      return { ...p, sort };
    });
  };

  const setLoading = (loading: boolean) => {
    setState((p) => ({ ...p, loading }));
  };

  const setPair = (pair: WaifuPair | null) => {
    setState((p) => ({ ...p, pair }));
  };

  const setNextPair = (nextPair: WaifuPair | null) => {
    setState((p) => ({ ...p, nextPair }));
  };

  const getNextPair = () => {
    getWaifuPairClient()
      .then(setNextPair)
      .catch((err: unknown) => {
        console.error("Failed to get next pair");
        console.error(err);
      });
  };

  useEffect(() => {
    const initial = getInitialContext();
    setState(initial);
  }, []);

  return (
    <WaifuContext
      value={{
        addVote,
        setSort,
        setLoading,
        setPair,
        setNextPair,
        getNextPair,
        ...state,
      }}
    >
      {children}
    </WaifuContext>
  );
};

export const useWaifuContext = () => use(WaifuContext);

// * Get the next pair of waifus
async function getWaifuPairClient(): Promise<WaifuPair> {
  const BASE = getBaseUrl();
  const res = await fetch(BASE + "/api/pair");
  const data: unknown = await res.json();

  const parsed = pairSchema.safeParse(data);

  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error(parsed.error.toString());
  }

  const pair = parsed.data;
  return pair;
}
