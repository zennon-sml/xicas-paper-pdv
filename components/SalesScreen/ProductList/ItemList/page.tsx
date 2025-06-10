import Image from 'next/image';
import React from 'react'

interface ItemListProps {
  id: number;
  name: string;
  price: number;
  image?: string;
  onSelect: () => void;
}

export default function ItemList({id, name, price, image, onSelect}:ItemListProps){
  return (
    <li className='flex flex-col '>
      <button onClick={onSelect} className='flex justify-between ml-1 p-1 border-[#48dad1] border-t-[0.01px] hover:bg-[#48dad1]'>
        <div className='text-start'>
          <div className='text-[#155b56]'>{id} - {name}</div>
          <div className=' font-bold text-[#164542]'>R${price}</div> 
        </div>
        <div>
          <div className=''>
            <Image
            width={56}
            height={56} 
            src={image || "/img/sem-foto.jpg"}
            alt="img" 
            className='w-14 h-14 p-0.5 bg-[#ffffff] rounded-md object-contain object-center'/>
          </div>
        </div>
      </button>
    </li>
  )
}


