import React from "react"

export default function Card() {
    return (
        <div className=' bg-white w-56 min-w-52 h-full border border-[#8BE8DC] rounded-md overflow-hidden'>
              <div className=' flex flex-col bg-[#8BE8DC] w-full text-center p-1'>
                <p className=' font-semibold text-sm text-[#0B625D]'>Segunda-Feira</p>
                <p className=' text-xs text-[#288d88]'>26/12/2024</p>
              </div>
              <div className='grid grid-cols-2 justify-items-center'>
                <div className='flex flex-col text-center gap-3 mt-3'>

                  <div className='flex flex-col'>
                    <label className='text-[11px] text-[#0B625D]'>Total de vendas:</label>
                    <p className='bg-[#dafffb] rounded-md text-sm font-semibold text-[#0B625D]'>100</p>
                  </div>

                  <div className='flex flex-col'>
                    <label className='text-[11px] text-[#0B625D]'>Total de produtos:</label>
                    <p className='bg-[#dafffb] rounded-md text-sm font-semibold text-[#0B625D]'>50</p>
                  </div>

                  <div className='flex flex-col'>
                    <label className='text-[11px] text-[#0B625D]'>Total de serviços:</label>
                    <p className='bg-[#dafffb] rounded-md text-sm font-semibold text-[#0B625D]'>50</p>
                  </div>
                </div>

                <div className='flex flex-col text-center gap-3 mt-3'>
                  <div className='flex flex-col'>
                    <label className='text-[11px] text-[#0B625D]'>Ganho bruto:</label>
                    <p className='bg-[#dafffb] rounded-md text-sm font-semibold text-[#0B625D]'>500000</p>
                  </div>

                  <div className='flex flex-col'>
                    <label className='text-[11px] text-[#0B625D]'>Ganho liquido:</label>
                    <p className='bg-[#dafffb] rounded-md text-sm font-semibold text-[#0B625D]'>50</p>
                  </div>

                  <div className='flex flex-col'>
                    <label className='text-[11px] text-[#0B625D]'>Valor gasto:</label>
                    <p className='bg-[#dafffb] rounded-md text-sm font-semibold text-[#0B625D]'>50</p>
                  </div>
                </div>
              </div>
            </div>
    )
}