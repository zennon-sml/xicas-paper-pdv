"use client";

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation'; // usado para obter o caminho atual da URL no lado do cliente

import { FaShoppingCart, FaDatabase, FaDollarSign } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import LoadingScreen from '../LoadingScreen';



export default function SideBar() {
  const [selectedButton, setSelectedButton] = useState<string>('sales') //Botão de periodo selecionado
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname();

  const buttons = [
    {id: "sales", route: "/pages/sales", icon: <FaShoppingCart />},
    {id: "stock", route: "/pages/stock", icon: <FaDatabase />},
    {id: "finances", route: "/pages/finances", icon: <FaDollarSign />}
  ];


  const handleButtonClick = (buttonId:any) => { //Muda botão selecionado
    setSelectedButton(buttonId)
  }

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div className='
    flex flex-col fixed items-center
    top-0 left-0 bottom-0 w-12
    bg-[#77CFC4]
    '>

      {isLoading && <LoadingScreen />}

      <button className='
      flex w-12 h-12
      bg-[#68c3b8] text-[#198A83]
      m-1 mb-12 text-3xl
      items-center justify-center
      hover:bg-[#8BE8DC]
      '><IoMenu /></button>

      {buttons.map((button) => (
        <Link key={button.id} href={button.route} onClick={handleClick}>
          <button
            onClick={() => handleButtonClick(button.id)}
            className={`flex w-12 h-12 text-[#198A83]
            text-xl items-center justify-center transition duration-300
            
            ${
              pathname === button.route
              ?`bg-[#2ba098] text-[#8BE8DC] z-10`
              : `hover:bg-[#8BE8DC]`
            }`}
          >
            {button.icon}
          </button>
        </Link>
      ))}

    </div>
  )
}

