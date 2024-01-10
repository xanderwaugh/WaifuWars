import { type MetadataRoute } from "next";

import { siteURL } from "~/utils/seoConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteURL,
      lastModified: new Date(),
    },
    {
      url: siteURL + "results/",
      lastModified: new Date(),
    },
    {
      url: siteURL + "about/",
      lastModified: new Date(),
    },
  ];
}
