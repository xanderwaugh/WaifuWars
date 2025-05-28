"use client";

import type { NextPage } from "next";

import { Header } from "~/components/navbar";
import { Spinner } from "~/components/spinner";

const Error: NextPage<ErrorPageProps> = ({ error }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between overflow-hidden py-16">
      <div className="flex flex-col items-center justify-center gap-1 pt-8 text-center">
        <h2 className="text-3xl text-red-700 md:text-4xl">
          Error loading waifu pair
        </h2>
        <p className="text-xl">{error.message}</p>
      </div>

      <div>
        <Spinner className="size-24 fill-white text-9xl text-red-500 duration-1000 ease-in-out" />
      </div>

      <Header />
    </div>
  );
};

export default Error;
