import React from 'react'

interface ItemListProps {
  name: string;
  value: number;
  image?: string;
}

export default function ItemList(props: ItemListProps){
  return (
    <li className='flex flex-col '>
      <button className='flex justify-between ml-1 p-1 border-[#48dad1] border-t-[0.01px] hover:bg-[#48dad1]'>
        <div className='text-start'>
          <div className='text-[#155b56]'>{props.name}</div>
          <div className=' font-bold text-[#164542]'>R${props.value}</div> 
        </div>
        <div>
          <div className=''>
            <img alt="img" 
            className='w-14 h-14 bg-[#ffffff] rounded-md'/>
          </div>
        </div>
      </button>
    </li>
  )
}


