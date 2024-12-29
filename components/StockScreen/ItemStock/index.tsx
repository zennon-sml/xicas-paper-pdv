interface IItemStock {
    id: number;
    name: string;
    qtd: number;
    cost: number;
    price: number;
    image?: string;
  }

export default function ItemStock ({id, name, qtd, cost, price, image}:IItemStock){
    return(
        <tr key={id} className="border-y border-[#198A83] bg-white">

            <td className="flex text-[#135550] font-bold text-center items-center h-12 w-full gap-3">
                <img 
                    src={image || "/img/sem-foto.jpg"} 
                    alt="" 
                    className="className='mx-1 h-12 w-12 p-0.5 bg-[#ffffff] rounded-md object-contain object-center"
                />
                <p>{name}</p>
            </td>
            <td className="text-[#135550] text-center font-semibold">{id}</td>
            <td className="text-[#135550] text-center font-semibold">{qtd}</td>
            <td className="text-[#135550] text-center font-semibold">{"R$ "+cost.toFixed(2)}</td>
            <td className="text-[#135550] text-center font-bold">{"R$ "+price.toFixed(2)}</td>
            <td className="flex gap-1 justify-center text-[#135550]">
                <button className=' bg-amber-300 hover:bg-amber-500'>ed</button>
                <button className=' bg-red-300 hover:bg-red-500'>ex</button>
            </td>
        </tr>
    )
}