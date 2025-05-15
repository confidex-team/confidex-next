import { LogBar } from "@/components/log-bar";
import MatrixBackground from "@/components/matrix-background";
import SwapInterface from "@/components/swap-interface";
import React from "react";
const page = () => {
  return (
    <div className="flex flex-row bg-black/5 justify-center items-start gap-24 p-8 min-h-screen">
      <MatrixBackground hover={false} />
      <SwapInterface />
      <LogBar />
    </div>
  );
};

export default page;
