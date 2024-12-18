import React from 'react';
import Link from 'next/link'
import { FaShoppingCart, FaDatabase, FaDollarSign } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

export default function SideBar() {
  return (
    <div className='
    flex flex-col fixed items-center
    top-0 left-0 bottom-0 w-12
    bg-[#77CFC4]
    '>
        <button className='
        flex w-12 h-12
        bg-[#68c3b8] text-[#198A83]
        m-1 mb-12 text-3xl
    	  items-center justify-center
        hover:bg-[#8BE8DC]
        '><IoMenu /></button>

        <Link href={"/pages/sales"}><button className='
        flex w-12 h-12 text-[#198A83]
        text-xl items-center justify-center
        hover:bg-[#8BE8DC]
        '><FaShoppingCart /></button></Link>

        <Link href={"/pages/stock"}><button className='
        flex w-12 h-12 text-[#198A83]
        text-xl items-center justify-center
        hover:bg-[#8BE8DC]
        '><FaDatabase /></button></Link>
        
        <Link href={"/pages/finances"}><button className='
        flex w-12 h-12 text-[#198A83]
        text-xl items-center justify-center
        hover:bg-[#8BE8DC]
        '><FaDollarSign /></button></Link>
    </div>
  )
}

