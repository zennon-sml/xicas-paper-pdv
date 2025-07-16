"use client";

import { useEffect, useState } from "react";
import { getAllSales, deleteSaleById } from "@/app/services/salesService";
import { getProductById } from "@/app/services/productService";
import { FaTrash } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";

import { ProductSold, Payment } from "@/app/interfaces/product";


export interface Sale {
  id?: number;
  saler_id?: number | null;
  products: ProductSold[];
  sale_date?: string | Date;
  payment_types: Payment;
  general_discount: number;
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
    const [showModal, setShowModal] = useState<boolean>(false);
    const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);

useEffect(() => {
  const fetchSales = async () => {
    try {
      const data = await getAllSales();
      console.log("Dados das vendas:", data);
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

          for (const item of sale.products) { // Itera sobre os produtos vendidos
            //console.log("Item da venda:", item);
            try {
              //const product = await getProductById(item.id ?? 0);
              productNames.push(item.name_sold || "Produto desconhecido");
              totalCost += item.quantity_sold * (item.cost_sold || 0);
            } catch {
              productNames.push("Erro ao buscar produto");
              totalCost += 0;
            }

            totalQuantity += item.quantity_sold;
            totalDiscount += item.discount || 0;
            totalPaid += item.quantity_sold * item.price_sold - (item.discount || 0);
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
}, [updateTrigger]);

const handleSale = (id: number) => {
  setShowModal(true); // Exibe o modal para editar a venda
}

const deleteSale = async (id: number) => {
  try {
      await deleteSaleById(id);
      setUpdateTrigger((prev) => !prev); // Altera o valor para disparar o useEffect
    } catch (error) {
      console.error('Erro ao deletar o venda:', error);
    }
  };
    

    return (
        <div className="flex flex-col flex-grow bg-[#CBFCF6] overflow-hidden">
          <div className='flex pt-3 pl-5 p-4 gap-2'>
            <div className="flex flex-col">
              <label className="text-sm text-[#198A83]">De:</label>
              <input type="date" className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 pl-2 hover:bg-[#68dbcb]"/>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#198A83]">Até:</label>
              <input type="date" className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 pl-2 hover:bg-[#68dbcb]"/>
            </div>
            <div className="flex flex-col ml-6">
              <label className="text-sm text-[#198A83]">Tipo:</label>
              <select id='tags' name='tags' className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-20 hover:bg-[#68dbcb]">
                <option value="todos">Dia</option>
                <option value="todos">Semana</option>
                <option value="todos">Mês</option>
                <option value="todos">Ano</option>
                <option value="todos">Tudo</option>
              </select>
            </div>
          </div>


          <div className=" flex bg-[#E4FFFC] border border-[#60baae] gap-2 px-3 ml-2 mr-2 rounded-md">
            
            <div className="flex flex-col">
              <label className="text-sm text-[#198A83]">Qtd Vendas:</label>
              <input type="text" className="flex bg-[#8BE8DC] text-[#0B625D] text-sm h-7 max-w-24 pl-2 rounded-md"/>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#198A83]">Descontos:</label>
              <input type="text" className="flex bg-[#8BE8DC] text-[#0B625D] text-sm h-7 max-w-24 pl-2 rounded-md"/>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#198A83]">Custos:</label>
              <input type="text" className="flex bg-[#8BE8DC] text-[#0B625D] text-sm h-7 max-w-24 pl-2 rounded-md"/>
            </div>

            <div className="flex border border-black p-1 m-1 rounded-md">
              <div className="flex flex-col">
                <label className="text-sm text-[#198A83]">Valores Pagos:</label>
                <input type="text" className="flex bg-[#8BE8DC] text-[#0B625D] text-sm h-7 max-w-24 pl-2 rounded-md"/>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[10px] text-[#198A83]">Din:</label>
                  <input type="text" className="flex bg-white text-[#0B625D] border-2 border-[#0B625D] text-[10px] h-4 max-w-16 pl-2 rounded-md"/>
                </div>
                <div className="flex gap-1">
                  <label className="text-[10px] text-[#198A83]">Pix:</label>
                  <input type="text" className="flex bg-white text-[#0B625D] border-2 border-[#0B625D] text-[10px] h-4 max-w-16 pl-2 rounded-md"/>
                </div>
                <div className="flex gap-1">
                  <label className="text-[10px] text-[#198A83]">Deb:</label>
                  <input type="text" className="flex bg-white text-[#0B625D] border-2 border-[#0B625D] text-[10px] h-4 max-w-16 pl-2 rounded-md"/>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <label className="text-[10px] text-[#198A83]">Cred:</label>
                  <input type="text" className="flex bg-white text-[#0B625D] border-2 border-[#0B625D] text-[10px] h-4 max-w-16 pl-2 rounded-md"/>
                </div>
                <div className="flex gap-1">
                  <label className="text-[10px] text-[#198A83]">Outros:</label>
                  <input type="text" className="flex bg-white text-[#0B625D] border-2 border-[#0B625D] text-[10px] h-4 max-w-16 pl-2 rounded-md"/>
                </div>
                
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#198A83]">Lucro Total:</label>
              <input type="text" className="flex bg-[#8BE8DC] text-[#0B625D] text-sm h-7 max-w-24 pl-2 rounded-md"/>
            </div>
          
          </div>


          {loading ? (
            <p className="text-center font-extrabold text-xl text-[#397F7B]">Carregando vendas...</p>
          ) : error ? (
            <p className="text-red-500">Erro: {error}</p>
          ) : (
            <div className="flex flex-col flex-grow rounded-md overflow-auto bg-[#E4FFFC] m-2 border-x-2 border-[#8BE8DC]">
              <table className="w-full">
                <thead className={`bg-[#8BE8DC] sticky top-0 ${showModal ? 'opacity-0 pointer-events-none' : ''}`}>
                  <tr className="text-sm text-[#397F7B]">
                    <th className="w-1/12">Nº</th>
                    <th className="w-1/12">ID Venda</th>
                    <th className="w-1/12">Vendedor</th>
                    <th className="w-2/12">Produtos</th>
                    <th className="w-1/12">Qtd</th>
                    <th className="w-1/12">Descontos</th>
                    <th className="w-1/12">Valor Pago</th>
                    <th className="w-1/12">Custos</th>
                    <th className="w-1/12">Ganhos</th>
                    <th className="w-2/12">Data/Hora</th>
                    <th className="w-1/12 text-center">Opçoes</th>
                  </tr>
                </thead>
                <tbody className="bg-[#B8FFF7] text-xs h-full">
                  {sales.map((sale, n) => (
                    <tr key={sale.id} className="border-y border-[#198A83] bg-white">
                      <td className="text-[#135550] font-bold text-center">{n + 1}</td>
                      <td className="text-[#135550] text-center font-semibold">{sale.id}</td>
                      <td className="text-[#135550] text-center font-semibold">{sale.saler_id}</td>
                      <td className="text-[#135550] text-center font-semibold">
                      {sale.productNames?.join(", ")}
                      {
                        // Object.entries(sale.payment_types)
                        //   .map(([key, value]) => `${key}: R$${value}`)
                        //   .join(", ")
                      }
                      </td>
                      <td className="text-[#135550] text-center font-semibold">{sale.totalQuantity}</td>
                      <td className="text-[#135550] text-center font-semibold">
                      R$ {sale.totalDiscount}
                      </td>
                      <td className="text-[#135550] text-center font-semibold">
                      R$ {sale.totalPaid?.toFixed(2)}

                      </td>
                      <td className="text-[#135550] text-center font-semibold">
                      R$ {sale.totalCost.toFixed(2)}
                      </td>
                      <td className="text-[#24a442] text-center font-bold">
                      R$ {sale.profit.toFixed(2)}
                      </td>
                      <td className="text-[#135550] text-center font-semibold py-2">
                      {sale.sale_date ? new Date(sale.sale_date).toLocaleString() : "-"}
                      </td>
                      <td className="text-center text-[#135550] text-[15px]">
                      <button onClick={() => handleSale(sale.id ?? 0)} className=' m-1 hover:text-amber-500'><BiSolidPencil/></button>
                      <button onClick={() => deleteSale(sale.id ?? 0)} className=' m-1 hover:text-red-500'><FaTrash /></button>
                  </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )}