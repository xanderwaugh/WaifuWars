/** @type {import('next-sitemap').IConfig} */

// * Next Sitemap Config
module.exports = {
  siteUrl: "https://xanny.dev/",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  sitemapSize: 7000,
};
