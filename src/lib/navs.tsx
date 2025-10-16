import Link from "next/link";

export interface NavItem {
  key: string;
  label: React.ReactNode;
  text: string;
  type?: "group" | "divider";
  children?: NavItem[];
}

const genItem = (key: string, label: string, labelType?: "element" | "string") => {
  labelType = labelType || "element";
  return {
    key,
    label:
      labelType === "element" ? (
        <Link className="inline-flex size-full items-center" href={key}>
          {label}
        </Link>
      ) : (
        label
      ),
    text: label,
  };
};

export const navItems = [
  {
    ...genItem("/uuid", "UUID", "string"),
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
