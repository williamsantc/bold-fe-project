'use client';
import { FC, ReactNode } from "react";
import { TransactionsProvider } from "@/context/TransactionsContext";
import CookieNotification from "@/components/CookieNotification/CookieNotification";
import { QueryProvider } from "@/context/QueryProvider";

type AppLayoutProps = {
    children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <QueryProvider>
      <TransactionsProvider>
        {children}
        <CookieNotification />
      </TransactionsProvider>
    </QueryProvider>
  );
};

export default AppLayout;
