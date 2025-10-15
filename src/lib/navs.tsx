import Link from "next/link";

const genItem = (key: string, label: string) => {
  return {
    key,
    label: (
      <Link className="inline-flex size-full items-center" href={key}>
        {label}
      </Link>
    ),
    text: label,
  };
};

export const navItems = [
  {
    ...genItem("/uuid", "UUID"),
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
    ...genItem("/other", "Other"),
    type: "group",
    children: [genItem("/other/vin", "VIN")],
  },
];
