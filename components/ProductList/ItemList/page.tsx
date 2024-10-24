import React from 'react'

interface ItemListProps {
  name: string;
  value: number;
}

export default function ItemList(props: ItemListProps){
  return (
    <li className=' border-[#189890] border-t-[0.01px] p-1'>
      <button>{props.name} | R${props.value}</button>
    </li>
  )
}


