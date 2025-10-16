"use client";
import React, { type ReactNode } from "react";

import { SearchOutlined, SmileFilled } from "@ant-design/icons";
import { Button, Input, Layout, Menu, theme } from "antd";

import Link from "next/link";

import { navItems } from "@/lib/navs";

import type { MenuItemType } from "antd/es/menu/interface";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, colorTextQuaternary, colorBorderSecondary },
  } = theme.useToken();

  const siderWidth = 320;

  return (
    <Layout>
      <Header className="sticky top-0 z-10 flex" style={{ background: colorBgContainer, padding: 0, borderBottom: `1px solid ${colorBorderSecondary}` }}>
        <Layout>
          <Sider width={320} theme="light" trigger={null}>
            <div className="px-2" style={{ borderRight: `1px solid ${colorBorderSecondary}` }}>
              <Link href="/">
                <Button type="primary" block variant="filled" size="large" icon={<SmileFilled />}>
                  <span className="font-semibold tracking-widest">AWRANDOM</span>
                </Button>
              </Link>
            </div>
          </Sider>

          <Content style={{ padding: "0 24px", background: colorBgContainer }}>
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
          </Content>
        </Layout>
      </Header>

      <Layout>
        <Sider width={siderWidth} trigger={null} collapsible theme="light">
          <Menu defaultSelectedKeys={["version-1-uuid"]} defaultOpenKeys={["uuid"]} mode="inline" items={navItems as MenuItemType[]} />
        </Sider>
        <Content
          style={{
            padding: 24,
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
