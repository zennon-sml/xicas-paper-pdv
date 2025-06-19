"use client";

import { useState } from "react";
import SideBar from "@/components/SideBar";
import SalesList from "@/components/FinanceScreen/SalesList";


export default function SalesHistory() {
  const [selectedButton, setSelectedButton] = useState<string>("TODAS");

  return (
    <div className="flex flex-col h-screen">
      <SideBar />

      <div className="flex fixed left-12 bg-[#8BE8DC] w-[calc(100%-3rem)] h-11 pr-3 pb-1 pt-1 "></div>
      <hr className="flex fixed top-11 left-12 border-[1px] border-[#0B625D] w-[calc(100%-3rem)]" />

      <div className="flex mt-11 gap-7">
        {["TODAS","DIA", "SEMANA", "MÊS", "ANO"].map((button) => (
          <button
            key={button}
            onClick={() => setSelectedButton(button)}
            className={`pr-3 pl-3 pt-1 pb-1 text-[#0B625D] border-t-[2px] ${
              selectedButton === button
                ? "border-t-[#4DC5BD] bg-[#CBFCF6] z-10 font-bold"
                : "hover:bg-[#d5fffa] hover:font-semibold"
            }`}
          >
            {button}
          </button>
        ))}
      </div>

      <SalesList />
    </div>
  );
}
