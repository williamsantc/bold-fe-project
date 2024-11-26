'use client';
import Head from "next/head";
import localFont from "next/font/local";
import { TransactionsProvider } from "@/context/TransactionsContext";
import { QueryProvider } from "@/context/QueryProvider";
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css';

const monserratFont = localFont({
  src: "./fonts/MonserratFont.ttf",
  variable: "--font-monserrat",
  weight: "400 500 600 700",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://bold.co/apple-touch-icon.png"
          data-gatsby-head="true"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://bold.co/favicon-32x32.png"
          data-gatsby-head="true"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://bold.co/favicon-16x16.png"
          data-gatsby-head="true"
        />
      </Head>
      <body className={monserratFont.variable}>
        <QueryProvider>
          <TransactionsProvider>{children}</TransactionsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
