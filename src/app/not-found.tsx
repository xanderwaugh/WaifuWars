import type { Metadata } from "next";

import Header from "~/components/Header";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-between gap-8 py-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">Page Not Found</h1>
      </div>

      <Header />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Waifu Wars - 404",
  description: "Vote for the best waifu!",
};
