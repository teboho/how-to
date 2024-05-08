import AuthProvider from "@/providers/authProvider";
import CategoryProvider from "@/providers/categoryProvider";
import ChatProvider from "@/providers/chatProvider";
import OfferProvider from "@/providers/offerProvider";
import PaymentProvider from "@/providers/paymentProvider";
import PortfolioProvider from "@/providers/portfolioProvider";
import ProfileProvider from "@/providers/profileProvider";
import ReviewProvider from "@/providers/reviewProvider";
import StoredFileProvider from "@/providers/storedFileProvider";
import SupportingFileProvider from "@/providers/supportingFileProvider";
import TaskProvider from "@/providers/taskProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOWTO",
  description: "How to do anything in the world.",
};

const ThemeTokenOverride = {
  colorBgContainer: "#E5E3D2",
  colorPrimaryActive: "#B64326",
  colorBgTextActive: "#B64326",
  colorPrimary: "#B64326",
  colorBorderBg: "#B64326",
  colorBorder: "#B64326",
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
                },
                Card: {
                  colorBorder: "#B64326",
                  colorBorderSecondary: "#B64326",
                },
              },
            }}
          >
            <div className="container">
              <AuthProvider>
                <StoredFileProvider>
                  <ProfileProvider>
                    <PortfolioProvider>
                      <TaskProvider>
                        <OfferProvider>
                          <ReviewProvider>
                            <PaymentProvider>
                              <CategoryProvider>
                                <ChatProvider>
                                  <SupportingFileProvider>
                                    {children}
                                  </SupportingFileProvider>
                                </ChatProvider>
                              </CategoryProvider>
                            </PaymentProvider>
                          </ReviewProvider>
                        </OfferProvider>
                      </TaskProvider>
                    </PortfolioProvider>
                  </ProfileProvider>
                </StoredFileProvider>
              </AuthProvider>
            </div>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
