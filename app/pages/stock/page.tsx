"use client"
import SideBar from '@/components/SideBar/page';
import { useState } from 'react';


const products = [
  { id: 1, name: 'Apple iPhone 13', value: 10.00, image: "/img/iphone13.jpg" },
  { id: 2, name: 'Samsung Galaxy S21', value: 699.99, image: '/img/galaxys21.webp' },
  { id: 3, name: 'Sony WH-1000XM4 Headphones', value: 349.99, image: '/img/SonyWH1000XM4Headphones.webp' },
  { id: 4, name: 'Dell XPS 13 Laptop', value: 999.99, image: '/img/DellXPS13Laptop.webp' },
  { id: 5, name: 'Nintendo Switch', value: 299.99, image: '/img/NintendoSwitch.jpeg' },
  { id: 6, name: 'Apple MacBook Air', value: 1099.99, image: '/img/AppleMacBookAir.jpeg' },
  { id: 7, name: 'Sony PlayStation 5', value: 499.99, image: '/img/SonyPlayStation5.jpeg' },
  { id: 8, name: 'Bose SoundLink Bluetooth Speaker', value: 129.99, image: '' },
  { id: 9, name: 'Fitbit Charge 4', value: 149.99, image: '' },
  { id: 10, name: 'Dyson V11 Vacuum Cleaner', value: 599.99, image: '' },
  { id: 11, name: 'Apple iPhone 13', value: 799.99, image: '' },
  { id: 12, name: 'Samsung Galaxy S21', value: 699.99, image: '' },
  { id: 13, name: 'Sony WH-1000XM4 Headphones', value: 349.99, image: '' },
  { id: 14, name: 'Dell XPS 13 Laptop', value: 999.99, image: '' },
  { id: 15, name: 'Nintendo Switch', value: 299.99, image: '' },
  { id: 16, name: 'Apple MacBook Air', value: 1099.99, image: '' },
  { id: 17, name: 'Sony PlayStation 5', value: 499.99, image: '' },
  { id: 18, name: 'Bose SoundLink Bluetooth Speaker', value: 129.99, image: '' },
  { id: 19, name: 'Fitbit Charge 4', value: 149.99, image: '' },
  { id: 20, name: 'Dyson V11 Vacuum Cleaner', value: 599.99, image: '' },
  { id: 1, name: 'Apple iPhone 13', value: 10.00, image: "/img/iphone13.jpg" },
  { id: 2, name: 'Samsung Galaxy S21', value: 699.99, image: '/img/galaxys21.webp' },
  { id: 3, name: 'Sony WH-1000XM4 Headphones', value: 349.99, image: '/img/SonyWH1000XM4Headphones.webp' },
  { id: 4, name: 'Dell XPS 13 Laptop', value: 999.99, image: '/img/DellXPS13Laptop.webp' },
  { id: 5, name: 'Nintendo Switch', value: 299.99, image: '/img/NintendoSwitch.jpeg' },
  { id: 6, name: 'Apple MacBook Air', value: 1099.99, image: '/img/AppleMacBookAir.jpeg' },
  { id: 7, name: 'Sony PlayStation 5', value: 499.99, image: '/img/SonyPlayStation5.jpeg' },
  { id: 8, name: 'Bose SoundLink Bluetooth Speaker', value: 129.99, image: '' },
  { id: 9, name: 'Fitbit Charge 4', value: 149.99, image: '' },
  { id: 10, name: 'Dyson V11 Vacuum Cleaner', value: 599.99, image: '' },
  { id: 11, name: 'Apple iPhone 13', value: 799.99, image: '' },
  { id: 12, name: 'Samsung Galaxy S21', value: 699.99, image: '' },
  { id: 13, name: 'Sony WH-1000XM4 Headphones', value: 349.99, image: '' },
  { id: 14, name: 'Dell XPS 13 Laptop', value: 999.99, image: '' },
  { id: 15, name: 'Nintendo Switch', value: 299.99, image: '' },
  { id: 16, name: 'Apple MacBook Air', value: 1099.99, image: '' },
  { id: 17, name: 'Sony PlayStation 5', value: 499.99, image: '' },
  { id: 18, name: 'Bose SoundLink Bluetooth Speaker', value: 129.99, image: '' },
  { id: 19, name: 'Fitbit Charge 4', value: 149.99, image: '' },
  { id: 20, name: 'Dyson V11 Vacuum Cleaner', value: 599.99, image: '' },
  { id: 17, name: 'Sony PlayStation 5', value: 499.99, image: '' },
  { id: 18, name: 'Bose SoundLink Bluetooth Speaker', value: 129.99, image: '' },
  { id: 19, name: 'Fitbit Charge 4', value: 149.99, image: '' },
  { id: 20, name: 'Dyson V11 Vacuum Cleaner', value: 599.99, image: '' },
  { id: 21, name: 'Dyson V11 Vacuum Cleaner', value: 599.99, image: '' }
];


export default function Stock() {
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
                <th className="w-2/6">Item</th>
                <th className="w-1/6">Produto</th>
                <th className="w-1/6">Qtd</th>
                <th className="w-1/6">Desconto</th>
                <th className="w-1/6">P.Unit</th>
                <th className="w-1/6">Total</th>
              </tr>
            </thead>
            <tbody className="bg-[#B8FFF7] text-xs h-full">
              {products.map((product, index) => (
                <tr className="border-y border-[#198A83] bg-white">

                  <td className="flex text-[#135550] font-bold text-center items-center h-12 w-full gap-3">
                    <img 
                    src={product.image || "/img/sem-foto.jpg"} 
                    alt="" 
                    className="className='mx-1 h-12 w-12 p-0.5 bg-[#ffffff] rounded-md object-contain object-center"
                    />
                    <p>{product.name}</p>
                  </td>

                  <td className="text-[#135550] text-center w-1/6">{product.value}</td>
                  <td className="text-[#135550] text-center w-1/6">{product.value}</td>
                  <td className="text-[#135550] text-center w-1/6">{product.value}</td>
                  <td className="text-[#135550] text-center w-1/6">{product.value}</td>
                  <td className="text-[#135550] text-center font-bold w-1/6">{product.value}</td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}