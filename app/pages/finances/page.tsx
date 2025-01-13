"use client"
import Card from '@/components/FinaceScreen/Card';
import SideBar from '@/components/SideBar';

import { useState } from 'react';

export default function Stock() {
  const [selectedButton, setSelectedButton] = useState<string>('DIA') //Botão de periodo selecionado
  
  const handleButtonClick = (buttonName:string) => { //Muda botão selecionado
    setSelectedButton(buttonName)
  } 
  
  return (
      <div className='flex flex-col h-screen'>
        <SideBar />
  
        <div className=' flex fixed left-12 bg-[#8BE8DC] w-[calc(100%-3rem)] h-11 pr-3 pb-1 pt-1 '>
          {/*<button className=' flex ml-auto w-24 rounded-md items-center bg-[#1DB935] text-[11px] font-bold text-white'>ADICIONAR PRODUTOS</button>  */}
        </div>
  
        <hr className='flex fixed top-11 left-12 border-[1px] border-[#0B625D] w-[calc(100%-3rem)]'></hr>
        

        <div className='flex mt-11 gap-7'>
          {['DIA', 'SEMANA', 'MÊS', 'ANO'].map((button) => (
            <button
              key={button}
              onClick={() => handleButtonClick(button)}
              className={`pr-3 pl-3 pt-1 pb-1 text-[#0B625D] border-t-[2px] ${
                selectedButton === button
                  ? 'border-t-[#4DC5BD] bg-[#CBFCF6] z-10 font-bold'
                  : 'hover:bg-[#d5fffa] hover:font-semibold'
              }`}
            >
              {button}
            </button>
          ))}
        </div>
  
        <div className='flex flex-col flex-grow bg-[#CBFCF6] overflow-hidden'>
          <div className='flex pt-4 pl-6 gap-2'>
            <div className='flex flex-col'>
              <label className="text-sm text-[#198A83]">De:</label>
              <input type="date" className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-auto pl-2 hover:bg-[#68dbcb]"/>
            </div>
            <div className='flex flex-col'>
              <label className="text-sm text-[#198A83]">Até:</label>
              <input type="date" className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-auto pl-2 hover:bg-[#68dbcb]"/>
            </div>
            <div className='flex flex-col ml-10'>
              <label className="text-sm text-[#198A83]">Tipo de Exibição:</label>
              <select id='type' name='type' className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-auto pl-1 hover:bg-[#68dbcb]">
                <option value="todos">Cards</option>
                <option value="cards"></option>
                <option value="cards"></option>
              </select>
            </div>
          </div>

          <div className=' flex flex-nowrap bg-[#E4FFFC] h-full w-full mx-2 mt-4 rounded-md p-3 gap-2 overflow-x-auto'>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    );
}