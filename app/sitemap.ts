import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bonuz.tech";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2024-12-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
