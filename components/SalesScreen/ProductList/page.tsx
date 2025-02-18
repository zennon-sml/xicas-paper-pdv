import { useState, useEffect } from "react";

import { IoMdSearch } from "react-icons/io";
import ItemList from './ItemList/page';
import { getAllProducts } from "@/app/services/productService";

interface Item {
  id: number;
  type: string;
  name: string;
  barcode: string;
  qtd: number;
  cost: number;
  description: string;
  tags: string;
  price: number;
  image?: string;
  cadCompleted: boolean;
}

export default function ProductList({handleSelectProduct}:any) {
  const [products, setProducts] = useState<Item[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        //const response = await fetch('/data/database.json').then() // Faz a requisição
        //const data = await response.json();  // Converte a resposta para JSON
        const data = await getAllProducts()

        setProducts(data)
      } catch (error){
        console.log("Erro na requisição:", error) // Trata erros
      }
    };
    fetchProducts()
  }, [])

  return (
      <div className=" flex flex-col overflow-hidden min-w-[500px]">
        <label className="text-sm text-[#198A83]">Lista de Produtos</label>
        <div className="flex flex-col flex-grow bg-[#B8FFF7] rounded-md overflow-hidden">
          <div className="flex">
            <input
              type="text"
              placeholder="Digite o produto..."
              className="flex-grow bg-[#198A83] placeholder-[#46b0a9] text-white text-lg h-10 pl-2 hover:bg-[#189890]"
            />
            <button className="w-8 bg-[#198A83] text-white text-xl flex items-center justify-center hover:bg-[#19a097]">
              <IoMdSearch />
            </button>
          </div>
            <div className="flex-grow overflow-auto h-screen">
              <ul className=" ">
                {products.map((product) => (
                  <ItemList 
                    key={product.id} 
                    {...product} 
                    onSelect={() => handleSelectProduct(product)}
                  />
                ))}
              </ul>
            </div>
        </div>
      </div>
  );
}
