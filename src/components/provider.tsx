"use client";

import { type ReactNode } from "react";

import { AntdRegistry } from "@ant-design/nextjs-registry";

import "@ant-design/v5-patch-for-react-19";
import AppLayout from "./app-layout";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <AppLayout>{children}</AppLayout>
    </AntdRegistry>
  );
};
