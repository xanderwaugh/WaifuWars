import type { MetadataRoute } from "next";

import { siteURL } from "~/lib/metadata";

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
