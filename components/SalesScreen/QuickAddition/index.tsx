import { IoMdSearch } from "react-icons/io";

export default function QuickAddition(){
    return(
        <div>
            <label className="text-sm text-[#198A83]">Adição Rapida de Produtos</label>    
                <div className="flex border border-[#28A9A1] rounded-md overflow-hidden">
                    <input type="text" placeholder="Digite o código de barras..." className="flex-grow bg-[#D7F8F4] placeholder-[#77d6d0] text-lg h-9 pl-2 hover:bg-[#bff7f1]"/>
                    <button className="w-8 bg-[#D7F8F4] text-[#46b0a9] text-xl flex items-center justify-center hover:bg-[#bff7f1]">
                        <IoMdSearch />
                    </button>
                </div>
        </div>
    )
}