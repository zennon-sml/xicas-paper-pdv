import React, { useEffect, useState } from 'react'

export default function ItemProperties({props, addProductList}:any){
  const [totalValue, setTotalValue] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [discount, setDiscount] = useState<string>("");

  useEffect(() => {
    setTotalValue(0);
    setQuantity(1);
    setDiscount("");
  }, [props])

  useEffect(() => {
    const discountValue = discount === "" ? 0 : Number(discount)
    setTotalValue((props.value*quantity)-discountValue)
  }, [props.value, quantity, discount])

  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quant = Number(event.target.value);
    setQuantity(quant);
    /* setTotalValue((props.value*quant)-discount) */
  };

  const handleDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const disc = event.target.value
    setDiscount(disc);
    /* setTotalValue((props.value*quantity)-disc) */
  };

  return (
    <div className='flex justify-between max-w-[500px] mt-3 mb-2'>
        <div className='flex flex-col justify-between w-44'>
          <div>
            <label className='text-sm text-[#198A83]'>Valor Unit. Produto:</label>
            <input 
              type="text" 
              disabled/* readOnly */
              className='w-44 h-9 p-2 bg-[#46b0a9] text-white  rounded-md text-lg'
              value={'R$ '+props.value.toFixed(2)}  
              />
          </div>
          <div>
            <label className='text-sm text-[#198A83]'>Desconto (R$):</label>
            <input 
            type="number" 
            className='w-44 h-8 p-2 bg-[#9efaf4] rounded-md text-lg'
            min={0}
            value={discount}
            onChange={handleDiscount}
            />
          </div>
          <div>
            <label className='text-sm text-[#198A83]'>Quantidade:</label>
            <input 
            type="number" 
            className='w-44 h-8 p-2 bg-[#9efaf4] rounded-md text-lg'
            value={quantity}
            min={1}
            onChange={handleQuantity}
            />
          </div>
          <div>
            <label className='text-sm text-[#198A83]'>Valor Total. Produto:</label>
            <input 
            type="text" 
            disabled/* readOnly */
            className='w-44 h-9 p-2 font-bold bg-[#46b0a9] text-white rounded-md text-lg'
            value={'R$ '+totalValue.toFixed(2)}
            />
          </div>
        </div>
        <div>
            <div className='flex flex-col items-center border border-[#3BDCD2] bg-[#3BDCD2] w-[185px] h-60 pt-[4px] rounded-md'>
              <img 
              alt="img-vazia" 
              src={props.image}
              className='border border-[#81f7ef] bg-[#ffffff] w-44 h-44 rounded-md'/>
              <p className='mt-1 pr-1 pl-1 text-xs text-[#198A83]'>{props.name}</p>
            </div>
        </div>
        <div className='flex items-end'>
          <button 
          onClick={() => addProductList({name:props.name, qtd:quantity, pUnit:props.value, desconto:discount}, setTotalValue(0), setQuantity(1), setDiscount(""))}
          disabled={!props.value || props.value === 0}
          className='bg-[#1DB935] hover:bg-[#269a38] text-white font-bold w-28 h-11 rounded-md'>
          INSERIR
          </button>
        </div>
    </div>
  )
}
