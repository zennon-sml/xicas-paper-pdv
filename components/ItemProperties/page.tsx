import React from 'react'

export default function ItemProperties(){
  return (
    <div className='flex justify-between max-w-[500px] max-h-[250px]'>
        <div className='flex flex-col justify-between w-44 mt-3'>
          <div>
            <label className='text-sm text-[#198A83]'>Valor Unit. Produto:</label>
            <input 
              type="text" disabled/* readOnly */
              className=' 
              w-44 h-9 p-2
              bg-[#9efaf4] 
              rounded-md'  
              />
          </div>
          <div>
            <label className='text-sm text-[#198A83] mt-5'>Quantidade:</label>
            <input type="number" 
              className=' 
              w-44 h-9 p-2
              bg-[#9efaf4]
              rounded-md text-lg'
              />
          </div>
          <div>
            <label className='text-sm text-[#198A83] mt-5'>Valor Total. Produto:</label>
            <input type="text" disabled/* readOnly */
            className=' 
            w-44 h-11 p-2
            bg-[#3BDCD2] 
            rounded-md'
            />
          </div>
        </div>
        <div>
            <div 
            className='
            flex flex-col items-center
            border border-[#3BDCD2] bg-[#3BDCD2]
            w-[185px] h-56 mt-3 pt-[4px] rounded-md
            '>
              <img alt="img-vazia" 
              className='
              border border-[#81f7ef] bg-[#ffffff]
              w-44 h-44 rounded-md
              '/>
              <p className='mt-1 text-xs text-[#198A83]'>Produto 1</p>
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
