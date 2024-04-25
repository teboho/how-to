
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AuthProvider from "@/providers/authProvider";
import { ConfigProvider, Input, Layout } from "antd";
import TaskProvider from "@/providers/taskProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HOWTO",
  description: "How to do anything in the world",
};

const ThemeTokenOverride = {
  colorBgContainer: "#E5E3D2",
  colorPrimaryActive: "#B64326",
  colorBgTextActive: "#B64326",
  colorPrimary: "#B64326",
  colorBorderBg: "#B64326",
  colorBorder: "#B64326",
  // colorText: "#B64326",
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode, }>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: ThemeTokenOverride,
              components: {
                Input: {
                  colorBorder: "#B64326",
                  colorText: "#B64326",
                }}
            }}
          >
            <div className="container">
              <AuthProvider>
                <TaskProvider>
                  {children}  
                </TaskProvider>
              </AuthProvider>
            </div>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
