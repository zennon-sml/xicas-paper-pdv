import Image from 'next/image';
import React, { useEffect, useState } from 'react'

import { ProductSold } from '@/app/interfaces/product';

export default function ItemProperties({props, addProductList}:any){
  const [totalValue, setTotalValue] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [discount, setDiscount] = useState<string>("");

    useEffect(() => { //Deixar valores padrão nos campos
    setTotalValue(0);
    setQuantity(1);
    setDiscount("");
  }, [props])

  useEffect(() => {
    const discountValue = discount === "" ? 0 : Number(discount) //Converte a variavel disconto que está como string para number
    setTotalValue((props.price*quantity)-discountValue) //Calculo para definir o valor total
  }, [props.price, quantity, discount]) //O calculo vai ser atualizado sempre que props.price ou quantity ou discount forem atualizados

  const handleQuantity = (value:string) => {
    const quant = Number(value);
    setQuantity(quant);
    /* setTotalValue((props.value*quant)-discount) */
  };

  const handleDiscount = (value: string) => {
    setDiscount(value);
    /* setTotalValue((props.value*quantity)-disc) */
  };

  return (
    <div className='flex justify-between max-w-[500px] mt-3 mb-2'>
        <div className='flex flex-col justify-between w-44'>
          <div>
            <label className='text-sm text-[#198A83]'>Valor Unit. Produto:</label>
            <input 
              type="text" 
              disabled
              className='w-44 h-9 p-2 bg-[#46b0a9] text-white  rounded-md text-lg'
              value={props.price || ""}  
              />
          </div>
          <div>
            <label className='text-sm text-[#198A83]'>Desconto (R$):</label>
            <input 
            type="number" 
            className='w-44 h-8 p-2 bg-[#9efaf4] rounded-md text-lg'
            min={0}
            value={discount}
            onChange={(e) => handleDiscount(e.target.value)}
            />
          </div>
          <div>
            <label className='text-sm text-[#198A83]'>Quantidade:</label>
            <input 
            type="number" 
            className='w-44 h-8 p-2 bg-[#9efaf4] rounded-md text-lg'
            value={quantity}
            min={1}
            onChange={(e) => handleQuantity(e.target.value)}
            />
          </div>
          <div>
            <label className='text-sm text-[#198A83]'>Valor Total. Produto:</label>
            <input 
            type="text" 
            disabled/* readOnly */
            className='w-44 h-9 p-2 font-bold bg-[#46b0a9] text-white rounded-md text-lg'
            value={`R$ ${isNaN(totalValue) ? "0.00" : totalValue.toFixed(2) }`}
            />
          </div>
        </div>
        <div>
            <div className='flex flex-col items-center border border-[#3BDCD2] bg-[#3BDCD2] w-[185px] h-60 pt-[4px] rounded-md'>
              <Image 
              width={174}
              height={174}
              alt="img-vazia" 
              src={props.image || "/img/sem-foto.jpg"}
              className='border border-[#81f7ef] bg-[#ffffff] w-44 h-44 p-1 rounded-md object-contain object-center'/>
              <p className='mt-1 pr-1 pl-1 text-xs text-[#198A83]'>{props.name}</p>
            </div>
        </div>
        <div className='flex items-end'>
          <button 
          onClick={() => addProductList({id:props.id ,name:props.name, quantity:quantity, price:props.price, cost:props.cost, discount:discount}, setTotalValue(0), setQuantity(1), setDiscount(""))}
          disabled={!props.price || props.price === 0}
          className='bg-[#59cf5d] hover:bg-[#238526] text-white font-bold w-28 h-11 rounded-md'>
          INSERIR
          </button>
        </div>
    </div>
  )
}
