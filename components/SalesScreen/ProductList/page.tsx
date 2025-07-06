import { useState, useEffect } from "react";
import Fuse from 'fuse.js';
import { IoMdSearch } from "react-icons/io";
import ItemList from './ItemList/page';
import { getAllProducts } from "@/app/services/productService";

import { Product } from "@/app/interfaces/product";


export default function ProductList({handleSelectProduct}:any) {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState<string>("")

  // Configurando o Fuse.js
  const fuse = new Fuse(products, {
    keys: ['name', 'id', 'barcode'],       // Quais campos buscar
    threshold: 1.0,       // Sensibilidade da busca (0 = precisa ser igual, 1 = tudo é parecido)
    distance: 100         // Máxima distância permitida entre os caracteres
  })

  // Função de pesquisa
  const handleSearch = (input: string) => {
    setQuery(input)
    if (input.trim() === '') {
      setProducts(products)
    } else{
      const result = fuse.search(input).map((res) => res.item)
      setProducts(result)
    }
  }


  useEffect(() => {
    if (query.trim() === ""){
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
    }
  }, [query])

  return (
      <div className=" flex flex-col overflow-hidden min-w-[500px]">
        <label className="text-sm text-[#198A83]">Lista de Produtos</label>
        <div className="flex flex-col flex-grow bg-[#B8FFF7] rounded-md overflow-hidden">
          <div className="flex">
            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Digite o produto..."
              value={query}
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
