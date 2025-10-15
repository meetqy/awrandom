import { type ItemType, type MenuItemType } from "antd/es/menu/interface";

import Link from "next/link";

const genItem = (key: string, label: string, labelType?: "string" | "element"): MenuItemType => {
  labelType = labelType || "element";

  return {
    key,
    label: labelType === "element" ? <Link href={key}>{label}</Link> : label,
  };
};

export const navItems: ItemType<MenuItemType>[] = [
  {
    ...genItem("/uuid", "UUID", "string"),
    type: "group",
    children: [
      genItem("/uuid/v1", "Version 1 UUID"),
      genItem("/uuid/v3", "Version 3 UUID"),
      genItem("/uuid/v4", "Version 4 UUID"),
      genItem("/uuid/v5", "Version 5 UUID"),
      genItem("/uuid/v6", "Version 6 UUID"),
      genItem("/uuid/v7", "Version 7 UUID"),
    ],
  },
  {
    ...genItem("/other", "Other", "string"),
    type: "group",
    children: [genItem("/other/vin", "VIN")],
  },
];
