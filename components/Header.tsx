"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wrapper } from "./Wrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-black/30 sticky top-0 z-50 font-space-grotesk">
      <Wrapper>
        <div className="flex items-center px-24 justify-between h-16">
          <Link
            href="/"
            className={`text-2xl font-bold ${
              pathname === "/swap"
                ? "bg-blue-600/90 text-gray-300 font-semibold"
                : "bg-blue-600 hover:text-blue-600 hover:bg-blue-600/5"
            } bg-clip-text text-transparent hover:opacity-80 transition-opacity flex items-center gap-2`}
          >
            {/* <motion.img
              src="/patty.png"
              alt="Patty"
              className={`w-6 h-6 ${
                pathname === "/swap"
                  ? "bg-black"
                  : "bg-blue-600 hover:text-blue-600 hover:bg-blue-600/5"
              } bg-clip-text text-transparent hover:opacity-80 transition-opacity flex items-center gap-2`}
            /> */}
            Confidex
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/swap"
              className={`px-4 py-[7px] bg-blue-600/50 rounded-none text-lg transition-all ${
                pathname === "/swap"
                  ? "bg-blue-600/10 text-gray-300 font-semibold"
                  : "text-white hover:text-blue-600 font-semibold hover:bg-gray-600/60"
              }`}
            >
              Swap
            </Link>

            <ConnectButton
              
              showBalance={false}
              accountStatus="address"
              label="Connect"
            />
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export { Header };
