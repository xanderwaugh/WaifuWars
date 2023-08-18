import Script from "next/script";

const Analytics: React.FC = () => {
  const GTAG_ID = "G-PNL6BCD0QW";

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GTAG_ID}');
        `}</Script>
    </>
  );
};

export default Analytics;
