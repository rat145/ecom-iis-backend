"use client";
import { useState } from "react";
import { QueryClientProvider, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import SettingProvider from "@/helper/settingContext/SettingProvider";
import AccountProvider from "@/helper/accountContext/AccountProvider";
import BadgeProvider from "@/helper/badgeContext/BadgeProvider";
import CartProvider from "@/helper/cartContext/CartProvider";
import { CookiesProvider } from "react-cookie";
import CategoryProvider from "@/helper/categoryContext/CategoryProvider";

const TanstackWrapper = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={children.dehydratedState}>
        <CookiesProvider defaultSetOptions>
          <SettingProvider>
            <AccountProvider>
              <BadgeProvider>
                <CategoryProvider>
                  <CartProvider>{children}</CartProvider>
                </CategoryProvider>
              </BadgeProvider>
            </AccountProvider>
          </SettingProvider>
        </CookiesProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default TanstackWrapper;
