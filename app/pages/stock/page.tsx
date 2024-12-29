"use client"
import SideBar from '@/components/SideBar/page';
import { useState, useEffect } from 'react';

interface Item {
  id: number;
  type: string;
  name: string;
  barcode: string;
  qtd: number;
  cost: number;
  description: string;
  tags: string;
  price: number;
  image?: string;
  cadCompleted: boolean;
}

export default function Stock() {
  const [products, setProducts] = useState<Item[]>([])
  
    useEffect(() => {
      const fetchProducts = async () => {
        try{
          const response = await fetch('/data/database.json').then() // Faz a requisição
          const data = await response.json();  // Converte a resposta para JSON
          setProducts(data.products)
        } catch (error){
          console.log("Erro na requisição:", error) // Trata erros
        }
      };
      fetchProducts()
    }, [])


  return (
    <div className='flex flex-col h-screen'>
      <SideBar />

      <div className=' flex fixed left-12 bg-[#8BE8DC] w-[calc(100%-3rem)] h-11 pr-3 pb-1 pt-1 '>
        <button className=' flex ml-auto w-24 rounded-md items-center bg-[#1DB935] text-[11px] font-bold text-white'>ADICIONAR PRODUTOS</button>
      </div>

      <hr className='flex fixed top-11 left-12 border-[1px] border-[#0B625D] w-[calc(100%-3rem)]'></hr>
      
      <div className='flex mt-11'>
        <button className='pr-3 pl-3 pt-1 pb-1 text-[#0B625D] border-t-[2px] hover:border-t-[#4DC5BD] hover:bg-[#CBFCF6] hover:z-10 hover:font-bold'>TODOS</button>
        <button className='pr-3 pl-3 pt-1 pb-1 text-[#0B625D] border-t-[2px] hover:border-t-[#4DC5BD] hover:bg-[#CBFCF6] hover:z-10 hover:font-bold'>CADASTRO PENDENTE</button>
        <button className='pr-3 pl-3 pt-1 pb-1 text-[#0B625D] border-t-[2px] hover:border-t-[#4DC5BD] hover:bg-[#CBFCF6] hover:z-10 hover:font-bold'>ESTOQUE BAIXO</button>
        <button className='pr-3 pl-3 pt-1 pb-1 text-[#0B625D] border-t-[2px] hover:border-t-[#4DC5BD] hover:bg-[#CBFCF6] hover:z-10 hover:font-bold'>LIXEIRA</button>
      </div>

      <div className='flex flex-col flex-grow bg-[#CBFCF6] overflow-hidden'>
        <div className='flex pt-6 pl-5 gap-2'>
          <input type="search" placeholder="Pesquisar por nome, codigo de barras..." className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-80 pl-2 hover:bg-[#68dbcb]"/>
          <select id='tags' name='tags' className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-40 pl-2 hover:bg-[#68dbcb]">
            <option value="todos">Todos</option>
            <option value="todos">#creu</option>
            <option value="todos">#vrau</option>
          </select>
        </div>

        <p className=' m-3'>0 produtos</p>

        <div className='flex flex-col flex-grow rounded-md overflow-auto bg-[#E4FFFC] m-2 border-x-2 border-[#8BE8DC]'>
          <table className='w-full'>
            <thead className='bg-[#8BE8DC] sticky top-0'>
              <tr className="text-sm text-[#397F7B]">
                <th className="w-2/6">Produto</th>
                <th className="w-1/6">ID</th>
                <th className="w-1/6">Qtd</th>
                <th className="w-1/6">Custo</th>
                <th className="w-1/6">Valor venda</th>
                <th className='w-1/6'>Opçoes</th>
              </tr>
            </thead>
            <tbody className="bg-[#B8FFF7] text-xs h-full">
              {products.map((product, index) => (
                
                <tr key={product.id} className="border-y border-[#198A83] bg-white">


                  <td className="flex text-[#135550] font-bold text-center items-center h-12 w-full gap-3">
                    <img 
                    src={product.image || "/img/sem-foto.jpg"} 
                    alt="" 
                    className="className='mx-1 h-12 w-12 p-0.5 bg-[#ffffff] rounded-md object-contain object-center"
                    />
                    <p>{product.name}</p>
                  </td>
                  <td className="text-[#135550] text-center">{product.id}</td>
                  <td className="text-[#135550] text-center">{product.qtd}</td>
                  <td className="text-[#135550] text-center">{product.cost}</td>
                  <td className="text-[#135550] text-center font-bold">{product.price}</td>
                  <td className="flex gap-1 justify-center text-[#135550]">
                    <button className=' bg-amber-300 hover:bg-amber-500'>ed</button>
                    <button className=' bg-red-300 hover:bg-red-500'>ex</button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}