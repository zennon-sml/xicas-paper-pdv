"use client"
import SideBar from '@/components/SideBar/page';
import { useState } from 'react';

export default function Stock() {
  return (
    <div className='flex flex-col'>
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

      <div className='flex w-screen h-screen pt-6 pl-5 bg-[#CBFCF6] gap-2'>
        <input type="search" placeholder="Pesquisar por nome, codigo de barras..." className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-80 pl-2 hover:bg-[#68dbcb]"/>
        <select id='tags' name='tags' className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-40 pl-2 hover:bg-[#68dbcb]">
          <option value="todos">Todos</option>
          <option value="todos">#creu</option>
          <option value="todos">#vrau</option>
        </select>

        <div>

        </div>
      </div>
    </div>
  );
}