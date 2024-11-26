import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css';
import AppLayout from "@/containers/AppLayout/AppLayout";

const monserratFont = localFont({
  src: "./fonts/MonserratFont.ttf",
  variable: "--font-monserrat",
  weight: "400 500 600 700",
});

export const metadata = {
  title: 'Internal tools | Bold',
  description: 'Facilitamos la gestión de la transacciones de nuestros clientes'
};

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
          href="/apple-touch-icon.png"
          data-gatsby-head="true"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
          data-gatsby-head="true"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
          data-gatsby-head="true"
        />
        <title>Bold fe project</title>
      </Head>
      <body className={monserratFont.variable}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
