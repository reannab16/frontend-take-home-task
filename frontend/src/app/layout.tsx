"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import theme from "./styles/theme";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Frontend task",
  description: "Hatless frontend task",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Toaster position="top-center" reverseOrder={false} />
          <body
            className={`flex flex-col items-center justify-start ${inter.className}`}
          >
            {children}
          </body>
        </ThemeProvider>
      </QueryClientProvider>
    </html>
  );
}
