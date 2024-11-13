import React, { useState } from 'react'

export default function ItemProperties({props}:any){
  const [totalValue, setTotalValue] = useState<number>(0);

  const handleTotalValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(event.target.value)
    setTotalValue(quantity*props.value)
  };

  return (
    <div className='flex justify-between max-w-[500px] mt-3 mb-2'>
        <div className='flex flex-col justify-between w-44'>
          <div>
            <label className='text-sm text-[#198A83]'>Valor Unit. Produto:</label>
            <input 
              type="text" 
              disabled/* readOnly */
              className=' 
              w-44 h-9 p-2
              bg-[#46b0a9] text-white 
              rounded-md text-lg'
              value={props.value}  
              />
          </div>
          <div>
            <label className='text-sm text-[#198A83]'>Desconto:</label>
            <input 
              type="number" 
              className=' 
              w-44 h-8 p-2
              bg-[#9efaf4]
              rounded-md text-lg'
              onChange={handleTotalValue}
              />
          </div>
          <div>
            <label className='text-sm text-[#198A83]'>Quantidade:</label>
            <input 
              type="number" 
              className=' 
              w-44 h-8 p-2
              bg-[#9efaf4]
              rounded-md text-lg'
              onChange={handleTotalValue}
              />
          </div>
          <div>
            <label className='text-sm text-[#198A83]'>Valor Total. Produto:</label>
            <input 
            type="text" 
            disabled/* readOnly */
            className=' 
            w-44 h-9 p-2 font-bold
            bg-[#46b0a9] text-white
            rounded-md text-lg'
            value={totalValue}
            />
          </div>
        </div>
        <div>
            <div 
            className='
            flex flex-col items-center
            border border-[#3BDCD2] bg-[#3BDCD2]
            w-[185px] h-60 pt-[4px] rounded-md
            '>
              <img 
              alt="img-vazia" 
              src={props.image}
              className='
              border border-[#81f7ef] bg-[#ffffff]
              w-44 h-44 rounded-md
              '/>
              <p className='mt-1 pr-1 pl-1 text-xs text-[#198A83]'>{props.name}</p>
            </div>
        </div>
        <div className='flex items-end'>
          <button className='
          bg-[#1DB935] text-white font-bold
          w-28 h-11 rounded-md
          '>INSERIR</button>
        </div>
    </div>
  )
}
