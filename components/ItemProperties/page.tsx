import React from 'react'

import './ItemProperties.css'

export default function ItemProperties(){
  return (
    <div className='flex'>
        <div>
            <h1>Valor Unit. Produto:</h1>
            <input 
              type="text" disabled/* readOnly */
              className=' 
                w-44 h-9 p-2
                bg-[#3BDCD2] 
                rounded-md'  
            />

            <h1>Quantidade:</h1>
            <input type="number" 
              className=' 
                w-44 h-9 p-2
                bg-[#9efaf4] 
                rounded-md'
            />

            <h1>Valor Total. Produto:</h1>
            <input type="text" disabled/* readOnly */
              className=' 
              w-44 h-9 p-2
              bg-[#3BDCD2] 
              rounded-md'
            />
        </div>
        <div>
            <div 
            className='
            flex flex-col items-center
            border border-[#3BDCD2] bg-[#3BDCD2]
            w-[185px] h-52 mt-3 ml-3 pt-[4px] rounded-md
            '>
              <img alt="img-vazia" 
              className='
              border border-[#81f7ef] bg-[#ffffff]
              w-44 h-44 rounded-md
              '/>
              <h1 className='mt-1'>Produto 1</h1>
            </div>

        </div>
    </div>
  )
}
