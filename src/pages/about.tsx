import { type NextPage } from "next";

// Client
import Head from "next/head";
import Header from "~/components/Header";

const AboutPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between gap-8 py-16">
      <Head>
        <title>Waifu Wars - About</title>
      </Head>

      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-center text-4xl">About</div>
      </div>

      <Header />
    </div>
  );
};

export default AboutPage;
