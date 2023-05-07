import { type NextPage } from "next";

// Client
import Head from "next/head";
import Link from "next/link";
import Header from "~/components/Header";

const AboutPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between gap-8 py-16">
      <Head>
        <title>Waifu Wars - About</title>
        <meta name="description" content="Waifu Wars - About" />
      </Head>

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">About</h1>

        <div className="text-center text-lg">
          This project was a shower thought turned wrong.
        </div>
        <ul className="flex list-disc flex-col items-start text-center text-lg font-medium">
          <li>
            <Link
              href="https://github.com/xanderwaugh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Creator
            </Link>{" "}
          </li>
          <li>
            <Link
              href="https://github.com/xanderwaugh/WaifuWars"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub Repo
            </Link>
          </li>
        </ul>
      </div>

      <Header />
    </div>
  );
};

export default AboutPage;
