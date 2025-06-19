import { ProductSold } from "@/app/interfaces/product";

export default function SaleList({saleList}:{ saleList: ProductSold[] }){
    return(
        <div className='flex flex-col w-full bg-[#B8FFF7] border border-[#5CC5BE] rounded-md overflow-hidden flex-grow'>
            <h2 className="bg-[#28A9A1] font-bold text-white text-center">LISTA DE VENDAS</h2>
            <div className="overflow-auto">    
                <table className='table-fixed w-full'>
                    <thead className='bg-[#5CC5BE] border-0 sticky top-0'>
                        <tr className="border-2 border-[#5CC5BE] text-xs text-white">
                            <th className=" w-1/12">Item</th>
                            <th className=" w-5/12">Produto</th>
                            <th className=" w-1/12">Qtd</th>
                            <th className=" w-2/12">Desconto</th>
                            <th className=" w-2/12">P.Unit</th>
                            <th className=" w-3/12">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#B8FFF7] text-xs flex-grow overflow-auto">
                        {saleList.map((product, i) => (
                            <tr className="border-b border-b-[#5CC5BE]" key={i}>
                                <td className="pl-1 pr-1 text-[#135550] text-center font-bold">{i+1}</td>
                                <td className="pl-1 pr-1 text-[#135550] text-center">{product.name}</td>
                                <td className="pl-1 pr-1 text-[#135550] text-center">{product.quantity}</td>
                                <td className="pl-1 pr-1 text-[#135550] text-center">{"R$ "+(product.discount === "" ? 0 : Number(product.discount))}</td>
                                <td className="pl-1 pr-1 text-[#135550] text-center">{"R$ "+(product.price)}</td>
                                <td className="pl-1 pr-1 text-[#135550] text-center font-bold">{"R$ "+((product.quantity*product.price)-(product.discount === "" ? 0 : Number(product.discount))).toFixed(2)}</td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
            </div>            
        </div>
    )
}