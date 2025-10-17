import { type MetadataRoute } from "next";

import { navMain } from "@/lib/sidebar";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://awrandom.com";

  // 基础页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  // 从 navMain 生成动态页面
  const dynamicPages = navMain.flatMap((section) =>
    section.items.map((item) => ({
      url: `${baseUrl}${item.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  return [...staticPages, ...dynamicPages];
}
