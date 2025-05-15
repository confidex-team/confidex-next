import { LogBar } from "@/components/log-bar";
import MatrixBackground from "@/components/matrix-background";
import SwapInterface from "@/components/swap-interface";
import React from "react";
const page = () => {
  return (
    <div className="flex flex-row justify-around items-center p-20 pt-4 ">
      <MatrixBackground hover={false} />
      <SwapInterface/>
      <LogBar/>
    </div>
  );
};

export default page;
