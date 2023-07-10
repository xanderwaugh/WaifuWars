import { createContext, useEffect, useState } from "react";
import { type Vote } from "~/types";

interface ContextProps {
  // Function to add a vote
  addVote: (vote: Vote) => void;
  // Total number of votes
  numVotes: number;
  // List of votes
  votes: Vote[];
  // Number between 0 and 1
  // accuracy: number;
}

const getInitialContext: () => Omit<ContextProps, "addVote"> = () => {
  if (typeof window === "undefined") return defaults;

  let numVotes = Number(localStorage.getItem("numVotes"));
  if (isNaN(numVotes)) numVotes = 0;

  // let accuracy = Number(localStorage.getItem("accuracy"));
  // if (isNaN(accuracy)) accuracy = 0;

  let rawVotes = localStorage.getItem("votes");
  if (!rawVotes) rawVotes = "[]";
  const votes = JSON.parse(rawVotes) as Vote[];

  return { numVotes, votes };
};

const defaults: Omit<ContextProps, "addVote"> = {
  numVotes: 0,
  votes: [],
};

export const WaifuContext = createContext<ContextProps>({
  addVote: () => undefined,
  numVotes: -1,
  votes: [],
});

interface ProviderProps {
  children: React.ReactNode;
}

export const WaifuProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, setState] = useState<Omit<ContextProps, "addVote">>(defaults);

  // const removeVote = () => {
  //   setState((p) => {
  //     const numVotes = p.numVotes - 1;
  //     const votes = p.votes.slice(0, -1);
  //     localStorage.setItem("numVotes", numVotes.toString());
  //     localStorage.setItem("votes", JSON.stringify(votes));
  //     return { ...p, numVotes, votes };
  //   });
  // };

  const addVote = (vote: Vote) => {
    setState((p) => {
      const numVotes = p.numVotes + 1;
      const votes = [...p.votes, vote];
      // localStorage.setItem("numVotes", numVotes.toString());
      // localStorage.setItem("votes", JSON.stringify(votes));
      return { ...p, numVotes, votes };
    });
  };

  useEffect(() => {
    const initial = getInitialContext();
    setState(initial);
  }, []);

  return (
    <WaifuContext.Provider value={{ addVote, ...state }}>
      {children}
    </WaifuContext.Provider>
  );
};
