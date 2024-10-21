import React from 'react'

import './PropriedadesItem.css'

export default function PropriedadesItem(){
  return (
    <div className='propriedades'>
        <div id='primeira-col'>
            <h1>Valor Unit. Produto:</h1>
            <input type="text" disabled/* readOnly *//>

            <h1>Quantidade:</h1>
            <input type="number" />

            <h1>Valor Total. Produto:</h1>
            <input type="text" disabled/* readOnly *//>
        </div>
        <div id='segunda-col'>
            <div id='imagem'>
                <img  alt="img-vazia" />
            </div>

        </div>
    </div>
  )
}
