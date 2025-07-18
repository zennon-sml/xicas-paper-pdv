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

    const [qtdProducts, setQtdProducts] = useState<number>(0);
    const [totalDiscounts, setTotalDiscounts] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);  
    const [totalPaid, setTotalPaid] = useState<number>(0);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    const [totalPix, setTotalPix] = useState<number>(0);
    const [totalDebit, setTotalDebit] = useState<number>(0);
    const [totalCredit, setTotalCredit] = useState<number>(0);
    const [totalOther, setTotalOther] = useState<number>(0);
    const [totalProfit, setTotalProfit] = useState<number>(0);

      // const addProductList = (item:ProductSold) => {
      //   setItens((prevProducts) => [...prevProducts, item]);
      //   setSelectedProduct(defaultProduct); // Reset selected product after adding
      // }

useEffect(() => {
  const fetchSales = async () => {
    try {
      const data = await getAllSales();
      console.log("Dados das vendas:", data);
      setQtdProducts(data.length)
      if (!data || data.length === 0) {
        throw new Error("Nenhuma venda encontrada.");
      }

      let totalDiscountsGlobal = 0;
      let totalCostGlobal = 0;
      let totalPaidGlobal = 0;
      let totalMoney = 0;
      let totalPix = 0;
      let totalDebit = 0;
      let totalCredit = 0;
      let totalOther = 0;

      const formattedSales: SaleDisplay[] = await Promise.all(
        data.map(async (sale: Sale) => {
          const productNames: string[] = [];
          let totalQuantity = 0;
          let totalPaid = 0;
          let totalDiscount = 0;
          let totalCost = 0;

          totalMoney += sale.payment_types.money || 0;
          totalPix += sale.payment_types.pix || 0;
          totalDebit += sale.payment_types.debit || 0;
          totalCredit += sale.payment_types.credit || 0;
          totalOther += sale.payment_types.other || 0;
          setTotalMoney(totalMoney);
          setTotalPix(totalPix);
          setTotalDebit(totalDebit);
          setTotalCredit(totalCredit);
          setTotalOther(totalOther);

          for (const item of sale.products) { // Itera sobre os produtos vendidos
            console.log("Item da venda:", item);
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
            

            // Acumula os totais globais
            totalPaidGlobal += totalPaid;
            totalCostGlobal += totalCost;
            totalDiscountsGlobal += item.discount || 0;
          }
          setTotalDiscounts(totalDiscountsGlobal);
          setTotalCost(totalCostGlobal);
          setTotalPaid(totalPaidGlobal);

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


          <div className=" flex bg-[#E4FFFC] border border-[#60baae] items-center gap-2 px-3 ml-2 mr-2 rounded-md">
            
            <div className="flex flex-col">
              <label className="text-sm text-[#198A83]">Qtd Vendas:</label>
              <input type="text" disabled value={qtdProducts} className="flex bg-[#8BE8DC] text-[#0B625D] text-sm h-7 max-w-24 pl-2 rounded-md"/>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#198A83]">Descontos:</label>
              <input type="text" disabled value={"R$ "+totalDiscounts.toFixed(2)} className="flex bg-[#8BE8DC] text-[#0B625D] text-sm h-7 max-w-24 pl-2 rounded-md"/>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#198A83]">Custos:</label>
              <input type="text" disabled value={"R$ "+totalCost.toFixed(2)} className="flex bg-[#8BE8DC] text-[#0B625D] text-sm h-7 max-w-24 pl-2 rounded-md"/>
            </div>

            <div className="flex border border-black p-1 m-1 gap-2 rounded-md items-center">
              <div className="flex flex-col">
                <label className="text-sm text-[#198A83]">Valores Pagos:</label>
                <input type="text" disabled value={"R$ "+totalPaid.toFixed(2)} className="flex bg-[#8BE8DC] text-[#0B625D] text-sm h-7 max-w-24 pl-2 rounded-md"/>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <div className="flex gap-1">
                  <label className="text-[10px] text-[#198A83]">Din:</label>
                  <input type="text" disabled value={"R$ "+totalMoney.toFixed(2)} className="flex bg-white text-[#0B625D] border-2 border-[#0B625D] text-[10px] h-4 max-w-16 pl-2 rounded-md"/>
                </div>
                <div className="flex gap-1">
                  <label className="text-[10px] text-[#198A83]">Pix:</label>
                  <input type="text" disabled value={"R$ "+totalPix.toFixed(2)} className="flex bg-white text-[#0B625D] border-2 border-[#0B625D] text-[10px] h-4 max-w-16 pl-2 rounded-md"/>
                </div>
                <div className="flex gap-1">
                  <label className="text-[10px] text-[#198A83]">Deb:</label>
                  <input type="text" disabled value={"R$ "+totalDebit.toFixed(2)} className="flex bg-white text-[#0B625D] border-2 border-[#0B625D] text-[10px] h-4 max-w-16 pl-2 rounded-md"/>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <div className="flex gap-1">
                  <label className="text-[10px] text-[#198A83]">Cred:</label>
                  <input type="text" disabled value={"R$ "+totalCredit.toFixed(2)} className="flex bg-white text-[#0B625D] border-2 border-[#0B625D] text-[10px] h-4 max-w-16 pl-2 rounded-md"/>
                </div>
                <div className="flex gap-1">
                  <label className="text-[10px] text-[#198A83]">Outros:</label>
                  <input type="text" disabled value={"R$ "+totalOther.toFixed(2)} className="flex bg-white text-[#0B625D] border-2 border-[#0B625D] text-[10px] h-4 max-w-16 pl-2 rounded-md"/>
                </div>
                
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#198A83]">Lucro Total:</label>
              <input type="text" disabled value={"R$ "+(totalPaid-totalCost).toFixed(2)} className="flex bg-[#8BE8DC] text-[#0B625D] text-sm h-7 max-w-24 pl-2 rounded-md"/>
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