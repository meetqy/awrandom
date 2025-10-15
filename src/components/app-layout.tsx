"use client";
import React, { type ReactNode } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Menu, theme } from "antd";

import { navItems } from "@/lib/navs";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorTextQuaternary },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        style={{ overflow: "auto", height: "100vh", position: "sticky", insetInlineStart: 0, top: 0, bottom: 0, scrollbarWidth: "thin", scrollbarGutter: "stable" }}
        width={280}
        trigger={null}
        collapsible
        theme="light"
      >
        <Header />
        <Menu className="!border-none" defaultSelectedKeys={["version-1-uuid"]} defaultOpenKeys={["uuid"]} mode="inline" items={navItems} />
      </Sider>

      <Layout>
        <Header className="sticky top-0 z-10" style={{ background: colorBgContainer, padding: "0 24px" }}>
          <Input
            suffix={
              <Button disabled size="small">
                ⌘ K
              </Button>
            }
            placeholder="Type keywords..."
            size="large"
            prefix={<SearchOutlined style={{ color: colorTextQuaternary }} />}
            className="max-w-72"
            variant="borderless"
          />
        </Header>
        <Content
          style={{
            padding: 24,
            margin: 16,
            borderRadius: borderRadiusLG,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
