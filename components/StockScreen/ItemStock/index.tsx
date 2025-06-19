import { FaTrash } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";

import { Product } from '@/app/interfaces/product';

interface IItemStock extends Product {
    handleProduct: (id?: number) => void;
    deleteProduct: (id?: number) => void;
  }

export default function ItemStock ({id, name, quantity, cost, price, image, handleProduct, deleteProduct}:IItemStock){
    return(
        <tr key={id} className="border-y border-[#198A83] bg-white">

            <td className="flex text-[#135550] font-bold text-center items-center h-12 w-full gap-3">
                <img 
                    src={image || "/img/sem-foto.jpg"} 
                    alt="" 
                    className="mx-1 h-12 w-12 p-0.5 bg-[#ffffff] rounded-md object-contain object-center"
                />
                <p>{name}</p>
            </td>
            <td className="text-[#135550] text-center font-semibold">{id}</td>
            <td className="text-[#135550] text-center font-semibold">{quantity}</td>
            <td className="text-[#135550] text-center font-semibold">{"R$ "+cost}</td>
            <td className="text-[#135550] text-center font-bold">{"R$ "+price}</td>
            <td className="text-center text-[#135550] text-[15px]">
                <button onClick={() => handleProduct(id)} className=' m-1 hover:text-amber-500'><BiSolidPencil/></button>
                <button onClick={() => deleteProduct(id)} className=' m-1 hover:text-red-500'><FaTrash /></button>
            </td>
        </tr>
    )
}