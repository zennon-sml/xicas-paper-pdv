"use client";

import { useEffect, useState } from "react";
import { getAllSales } from "@/app/services/salesService";
import { getProductById } from "@/app/services/productService";

// Interfaces
export interface Product { // estrutura esperada de um produto.
    id: number;
    name: string;
    cost: number;  
    price: number;
}

export interface SaleProduct {
  product_id: number;
  qtd: number;
  pUnit: number;
  descount: number;
}

export interface Sale {
  id?: number;
  saler_id?: number | null;
  products: SaleProduct[];
  sale_date?: string | Date;
}

interface SaleDisplay extends Sale {
  productNames: string[];
  totalQuantity: number;
  totalPaid: number;
  totalDiscount: number;
  totalCost: number;
  profit: number;
}


export default function SalesList() {
    const [sales, setSales] = useState<SaleDisplay[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchSales = async () => {
    try {
      const data = await getAllSales();
      if (!data || data.length === 0) {
        throw new Error("Nenhuma venda encontrada.");
      }

      const formattedSales: SaleDisplay[] = await Promise.all(
        data.map(async (sale: Sale) => {
          const productNames: string[] = [];
          let totalQuantity = 0;
          let totalPaid = 0;
          let totalDiscount = 0;
          let totalCost = 0;

          for (const item of sale.products) {
            try {
              const product = await getProductById(item.product_id);
              productNames.push(product?.name || "Produto desconhecido");
              totalCost += item.qtd * (product?.cost || 0);
            } catch {
              productNames.push("Erro ao buscar produto");
              totalCost += 0;
            }

            totalQuantity += item.qtd;
            totalDiscount += item.descount;
            totalPaid += item.qtd * item.pUnit - item.descount;
          }

          const profit = totalPaid - totalCost;

          return {
            ...sale,
            productNames,
            totalQuantity,
            totalPaid,
            totalDiscount,
            totalCost,
            profit
          };
        })
      );

      setSales(formattedSales);
    } catch (err) {
      setError((err as Error).message);
      console.log("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchSales();
}, []);


    return (
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
                  <th className="border border-[#0B625D] p-2">Nº</th>
                  <th className="border border-[#0B625D] p-2">ID Venda</th>
                  <th className="border border-[#0B625D] p-2">Vendedor</th>
                  <th className="border border-[#0B625D] p-2">Produtos</th>
                  <th className="border border-[#0B625D] p-2">Qtd</th>
                  <th className="border border-[#0B625D] p-2">Descontos</th>
                  <th className="border border-[#0B625D] p-2">Valor Pago</th>
                  <th className="border border-[#0B625D] p-2">Custos</th>
                  <th className="border border-[#0B625D] p-2">Ganhos</th>
                  <th className="border border-[#0B625D] p-2">Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, n) => (
                    <tr key={sale.id} className="text-center">
                        <td className="border border-[#0B625D] p-2">{n + 1}</td>
                        <td className="border border-[#0B625D] p-2">{sale.id}</td>
                        <td className="border border-[#0B625D] p-2">{sale.saler_id}</td>
                        <td className="border border-[#0B625D] p-2">
                        {sale.productNames?.join(", ")}
                        </td>
                        <td className="border border-[#0B625D] p-2">{sale.totalQuantity}</td>
                        <td className="border border-[#0B625D] p-2">
                        R$ {sale.totalDiscount}
                        </td>
                        <td className="border border-[#0B625D] p-2">
                        R$ {sale.totalPaid?.toFixed(2)}
                        </td>
                        <td className="border border-[#0B625D] p-2">
                        R$ {sale.totalCost.toFixed(2)}
                        </td>
                        <td className="border border-[#0B625D] p-2">
                        R$ {sale.profit.toFixed(2)}
                        </td>
                        <td className="border border-[#0B625D] p-2">
                        {sale.sale_date ? new Date(sale.sale_date).toLocaleString() : "-"}
                        </td>
                    </tr>
                    ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )}