import React from 'react'

interface ItemListProps {
  name: string;
  value: number;
}

export default function ItemList({name, value}: ItemListProps){
  return (
    <div>
      <li>
        <button>{name} | R${value}</button>
      </li>
    </div>
  )
}


