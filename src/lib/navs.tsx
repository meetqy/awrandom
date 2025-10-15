import { type ItemType, type MenuItemType } from "antd/es/menu/interface";

import Link from "next/link";

const genItem = (key: string, label: string): MenuItemType => ({
  key,
  label: <Link href={key}>{label}</Link>,
});

export const navItems: ItemType<MenuItemType>[] = [
  {
    ...genItem("/uuid", "UUID"),
    type: "group",
    children: [genItem("/uuid/version-1", "Version 1 UUID"), genItem("/uuid/version-4", "Version 4 UUID"), genItem("/uuid/version-7", "Version 7 UUID")],
  },
  genItem("/guid", "GUID"),
  genItem("/vin", "VIN"),
];
