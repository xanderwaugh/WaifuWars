import { type NextPage } from "next";
import { NextSeo } from "next-seo";

import Head from "next/head";
import Header from "~/components/Header";

const AboutPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between gap-8 py-16">
      <Head>
        <title>Waifu Wars - About</title>
        <meta name="description" content="Waifu Wars - About" />
      </Head>
      <NextSeo canonical="https://https://waifuwars.net/about" />

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">About</h1>

        <div className="text-center text-lg"></div>
        <ul className="flex max-w-sm list-disc flex-col items-start pt-12 text-left text-lg font-medium">
          <li>This project was a shower thought.</li>
          <li>Discord: xander#8258</li>
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
