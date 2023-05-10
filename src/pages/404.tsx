import Head from "next/head";
import Header from "~/components/Header";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-between gap-8 py-16">
      <Head>
        <title>Waifu Wars - 404</title>
        <meta name="description" content="Waifu Wars - About" />
        <link rel="canonical" href="https://waifuwars.net/404" />
      </Head>

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-4xl">Page Not Found</h1>
      </div>

      <Header />
    </div>
  );
}
