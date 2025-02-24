import { IoMdSearch } from "react-icons/io";
import { getProductByBarcode } from "@/app/services/productService";
import { useState } from "react";

export default function QuickAddition({addProductList}:any){
    const [query, setQuery] = useState<string>("")

    const search = async () => {
        console.log(getProductByBarcode(query))
        const props = await getProductByBarcode(query)
        addProductList({id:props.id ,name:props.name, qtd:1, pUnit:props.price, desconto:0})
    }

    const handleSearch = (input: string) => {
        setQuery(input)
        console.log(query)
    }

    return(
        <div>
            <label className="text-sm text-[#198A83]">Adição Rapida de Produtos</label>    
                <div className="flex border border-[#28A9A1] rounded-md overflow-hidden">
                    <input type="text" onChange={(e) => handleSearch(e.target.value)} placeholder="Digite o código de barras..." className="flex-grow bg-[#D7F8F4] placeholder-[#77d6d0] text-lg h-9 pl-2 hover:bg-[#bff7f1]"/>
                    <button onClick={search} className="w-8 bg-[#D7F8F4] text-[#46b0a9] text-xl flex items-center justify-center hover:bg-[#bff7f1]">
                        <IoMdSearch />
                    </button>
                </div>
        </div>
    )
}