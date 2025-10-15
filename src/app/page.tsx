"use client";
import { Typography, Button } from "antd";

import { navItems } from "@/lib/navs";

import type { MenuItemType } from "antd/es/menu/interface";

const { Title, Text } = Typography;

export default function Home() {
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Title>Welcome to AwwRandom!</Title>
        <Text type="secondary">Select a generator from the options below to get started.</Text>
      </div>

      {navItems.map((item) => {
        if (!item) return null;

        // 如果是分组项
        if (item?.type === "group" && item.children) {
          return (
            <div key={item.key} style={{ marginBottom: "32px" }}>
              <Title level={2} style={{ marginBottom: "16px" }}>
                {item.label}
              </Title>
              <div className="flex flex-wrap gap-4">
                {item.children.map((child) => (
                  <div key={child?.key}>
                    <Button size="large">{(child as MenuItemType).label}</Button>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // 如果是普通项目
        return (
          <div key={item?.key} style={{ marginBottom: "32px" }}>
            <Button size="large">{(item as MenuItemType).label}</Button>
          </div>
        );
      })}
    </div>
  );
}
