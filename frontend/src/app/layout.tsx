import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HOWTO",
  description: "How to do anything in the world",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode, }>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <div className="container">
            {children}
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
