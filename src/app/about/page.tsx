import type { Metadata, NextPage } from "next";
import Link from "next/link";

import Header from "~/components/Header";

const AboutPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between gap-8 py-16">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">About</h1>

        <div className="text-center text-lg"></div>
        <ul className="flex max-w-sm list-inside list-disc flex-col items-start pt-12 text-left text-lg font-medium">
          <li>This project was a shower thought.</li>
          <li>
            Discord:{" "}
            <Link
              href="https://discord.com/users/272513708188499968"
              target="_blank"
              rel="noopener noreferrer"
              className="link text-nav-active"
            >
              xandykandy
            </Link>
          </li>
          <li>
            None of these images belong to me and are used in non-commerical
            ways.
          </li>
          {/* <li>
            <Link
              href="https://github.com/xanderwaugh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Creator
            </Link>{" "}
          </li> */}
          {/* <li>
            <Link
              href="https://github.com/xanderwaugh/WaifuWars"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub Repo
            </Link>
          </li> */}
        </ul>
      </div>

      <Header />
    </div>
  );
};

export default AboutPage;

export const metadata: Metadata = {
  title: "Waifu Wars - About",
  description: "Vote for the best waifu!",
  // image: "/assets/og-image.png",
};
