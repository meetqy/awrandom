export const navMain = [
  {
    title: "UUID",
    url: "#",
    items: [
      { title: "Version 1 UUID", url: "/gen/uuid/v1" },
      { title: "Version 3 UUID", url: "/gen/uuid/v3" },
      { title: "Version 4 UUID", url: "/gen/uuid/v4" },
      { title: "Version 5 UUID", url: "/gen/uuid/v5" },
      { title: "Version 6 UUID", url: "/gen/uuid/v6" },
      { title: "Version 7 UUID", url: "/gen/uuid/v7" },
    ],
  },
  {
    title: "Other",
    url: "#",
    items: [
      { title: "VIN", url: "/gen/other/vin" },
      { title: "IMEI Number", url: "/gen/other/imei" },
    ],
  },
  // {
  //   title: "Game",
  //   url: "#",
  //   items: [{ title: "Random Build LoL", url: "/gen/game/lol-build" }],
  // },
];

export const getNavMainItem = (url: string) => {
  for (const section of navMain) {
    for (const item of section.items) {
      if (item.url === url) {
        return item;
      }
    }
  }
  return null;
};

export const getBreadcrumbItems = (url: string) => {
  const items = [];

  // 查找匹配的导航项
  for (const section of navMain) {
    for (const item of section.items) {
      if (item.url === url) {
        // 添加父级（section）
        if (section.url !== "#") {
          items.push({
            label: section.title,
            href: section.url,
            isCurrentPage: false,
          });
        } else {
          // 如果父级 URL 是 #，只显示标题不可点击
          items.push({
            label: section.title,
            isCurrentPage: false,
          });
        }

        // 添加当前项目
        items.push({
          label: `Random ${item.title} Generator`,
          href: item.url,
          isCurrentPage: true,
        });

        return items;
      }
    }
  }

  // 如果没有找到匹配项，返回空数组
  return [];
};
