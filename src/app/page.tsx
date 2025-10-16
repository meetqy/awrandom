"use client";
import { Typography, Button } from "antd";

import Link from "next/link";

import { navItems } from "@/lib/navs";

const { Title, Text } = Typography;

export default function Home() {
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Title>Welcome to awrandom!</Title>
        <Text type="secondary">Select a generator from the options below to get started.</Text>
      </div>

      {navItems.map((item) => {
        if (!item) return null;

        // 如果是分组项
        if (item.children) {
          return (
            <div key={item.key} style={{ marginBottom: "32px" }}>
              <Title level={2} style={{ marginBottom: "16px" }}>
                {item.text}
              </Title>
              <div className="flex flex-wrap gap-4">
                {item.children.map((child) => (
                  <Link href={child.key} key={child.key}>
                    <Button size="large">{child.text}</Button>
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        // 如果是普通项目
        return (
          <Link href={item.key} key={item?.key}>
            <Button size="large">{item.text}</Button>
          </Link>
        );
      })}
    </div>
  );
}
