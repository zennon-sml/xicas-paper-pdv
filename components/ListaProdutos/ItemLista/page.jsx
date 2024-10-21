import React from 'react'

export default function ItemLista({name, valor}){
  return (
    <div>
      <li>
        <button>{name} | R${valor}</button>
      </li>
    </div>
  )
}


