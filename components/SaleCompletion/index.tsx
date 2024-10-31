export default function SaleCompletion(){
    return(
        <div className="flex justify-between ml-7 mt-3 mb-7">
            <div className="flex gap-2">
                <div className="flex flex-col">
                    <label className="text-sm text-[#198A83]">Total Itens</label>
                    <input type="text" placeholder="Tt. Itens" 
                    className="
                    border-2 border-[#28A9A1] rounded-md 
                    w-28 h-12 text-center
                    " />
                </div>

                <div className="flex flex-col">
                <label className="text-sm text-[#198A83]">Sub. Total</label>
                    <input type="text" placeholder="Sub Total" 
                    className="
                    border-2 border-[#28A9A1] rounded-md 
                    w-40 h-12 text-center
                    "/>
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <button 
                className="
                bg-[#FE3F3F] text-white font-bold
                w-28 h-9 rounded-md"
                >CANCELAR</button>

                <button 
                className=" 
                bg-[#1DB935] text-white font-bold
                w-40 h-12 rounded-md"
                >FINALIZAR VENDA</button>
            </div>
        </div>
    )
}