"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { baseSepolia, hardhat } from "wagmi/chains";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "Solidity Next.js Starter",
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID ?? "",
  chains: [baseSepolia, hardhat, ],
  ssr: true,
});

const Providers = ({ children }: { children: ReactNode }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#2563eb",
          accentColorForeground: "white",
          fontStack: "system",
          borderRadius: "none",
          overlayBlur: "small",
        })}
      >{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export { Providers };
