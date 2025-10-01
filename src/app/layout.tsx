import type { Metadata } from "next";

// style
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// component
import { MSWProvider } from "@/app/_component/MSWComponent";
import AuthSession from "./_component/AuthSessionProvider";

if (
  process.env.NEXT_RUNTIME === "nodejs" && // node.js 환경에서 돌아가면서
  process.env.NODE_ENV !== "production" && // 배포 이외 경우면서
  process.env.NEXT_PUBLIC_MSW_ENABLED !== "false" // MSW_ENABLED가 true일때
) {
  // 서버 컴포넌트 일때는 @/mocks/http 사용
  const { server } = require("@/mocks/http");
  server.listen();
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Z. 무슨 일이 일어나고 있나요? / Z",
  description: "Z.com inspired by X.com, made with Next.js and React",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MSWProvider>
          <AuthSession>
            {children}
            {modal}
          </AuthSession>
        </MSWProvider>
      </body>
    </html>
  );
}
