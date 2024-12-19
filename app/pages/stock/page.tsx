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
    </div>
  );
}