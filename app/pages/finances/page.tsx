"use client"

import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";

interface Sale {
  id: number;
  product_id: number;
  admin_id: number;
  quantity: number;
  total: string;
  sale_date: string;
}

export default function SalesHistory() {
  const [selectedButton, setSelectedButton] = useState<string>("DIA");
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sales");
        if (!response.ok) {
          throw new Error("Erro ao buscar vendas");
        }
        const data: Sale[] = await response.json();
        setSales(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <SideBar />

      <div className="flex fixed left-12 bg-[#8BE8DC] w-[calc(100%-3rem)] h-11 pr-3 pb-1 pt-1 "></div>
      <hr className="flex fixed top-11 left-12 border-[1px] border-[#0B625D] w-[calc(100%-3rem)]" />

      <div className="flex mt-11 gap-7">
        {["DIA", "SEMANA", "MÊS", "ANO"].map((button) => (
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

      <div className="flex flex-col flex-grow bg-[#CBFCF6] overflow-hidden p-4">
        {loading ? (
          <p>Carregando vendas...</p>
        ) : error ? (
          <p className="text-red-500">Erro: {error}</p>
        ) : (
          <div className="bg-[#E4FFFC] h-full w-full rounded-md p-3 overflow-y-auto">
            <table className="w-full border-collapse border border-[#0B625D]">
              <thead>
                <tr className="bg-[#8BE8DC] text-[#0B625D]">
                  <th className="border border-[#0B625D] p-2">ID</th>
                  <th className="border border-[#0B625D] p-2">Produto</th>
                  <th className="border border-[#0B625D] p-2">Quantidade</th>
                  <th className="border border-[#0B625D] p-2">Total</th>
                  <th className="border border-[#0B625D] p-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="text-center">
                    <td className="border border-[#0B625D] p-2">{sale.id}</td>
                    <td className="border border-[#0B625D] p-2">{sale.product_id}</td>
                    <td className="border border-[#0B625D] p-2">{sale.quantity}</td>
                    <td className="border border-[#0B625D] p-2">R$ {sale.total}</td>
                    <td className="border border-[#0B625D] p-2">{new Date(sale.sale_date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
