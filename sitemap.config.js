/** @type {import('next-sitemap').IConfig} */

// * Next Sitemap Config
module.exports = {
  siteUrl: "https://waifuwars.net/", // waifu.xanny.dev
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: "/privacy" }],
  },
  exclude: ["/privacy"],
  sitemapSize: 7000,
};
