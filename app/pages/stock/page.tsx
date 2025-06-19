"use client"
import SideBar from '@/components/SideBar';
import ModalItemScreen from '@/components/StockScreen/ModalItemScreen';
import Fuse from 'fuse.js';
import { getAllProducts, deleteProductById } from '@/app/services/productService';
import { useState, useEffect } from 'react';
import { Product } from '@/app/interfaces/product';
import { FaTrash } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";


export default function Stock() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedButton, setSelectedButton] = useState<string>('TODOS')
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productIdSelect, setProductIdSelect] = useState<number>(0);
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);
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
          // const response = await fetch('/data/database.json').then() // Faz a requisição
          // const data = await response.json();  // Converte a resposta para JSON
          const data = await getAllProducts()
          setProducts(data)
        } catch (error){
          console.log("Erro na requisição:", error) // Trata erros
        }
      };
      fetchProducts()
    }
  }, [showModal, updateTrigger, query])

  //Para finalizar venda
  const handleProduct = (id: number) => { 
    setShowModal(true); //Exibe o modal   
    setProductIdSelect(id);
  }

  const deleteProduct = async (id: number) => {
    try {
      await deleteProductById(id);
      setUpdateTrigger((prev) => !prev); // Altera o valor para disparar o useEffect
    } catch (error) {
      console.error('Erro ao deletar o produto:', error);
    }
  };

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false); //Fecha modal
  }

  const handleButtonClick = (buttonName:string) => {
    setSelectedButton(buttonName)
  }

  return (
    <div className='flex flex-col h-screen'>
      <SideBar />
      <ModalItemScreen showModal={showModal} idProduct={productIdSelect} closeModal={closeModal} />

      <div className=' flex fixed left-12 bg-[#8BE8DC] w-[calc(100%-3rem)] h-11 pr-3 pb-1 pt-1 '>
        <button 
          className=' flex ml-auto w-24 rounded-md items-center bg-[#23b7bc] text-[11px] font-bold text-white'
          >ADICIONAR ESTOQUE</button>

        <button className=' flex ml-1 w-24 rounded-md items-center bg-[#e0a92a] text-[11px] font-bold text-white'>RETIRAR ESTOQUE</button>
        
        <button 
        className=' flex ml-1 w-28 rounded-md items-center bg-[#1DB935] text-[11px] font-bold text-white'
        onClick={() => handleProduct(0)}
        >ADICIONAR PRODUTO NOVO</button>
      
      </div>

      <hr className='flex fixed top-11 left-12 border-[1px] border-[#0B625D] w-[calc(100%-3rem)]'></hr>
      
      <div className='flex mt-11'>
        {['TODOS', 'CADASTRO PENDENTE', 'ESTOQUE BAIXO', 'LIXEIRA'].map((button) => (
          <button
            key={button}
            onClick={() => handleButtonClick(button)}
            className={`pr-3 pl-3 pt-1 pb-1 text-[#0B625D] border-t-[2px] ${
              selectedButton === button
                ? 'border-t-[#4DC5BD] bg-[#CBFCF6] z-10 font-bold'
                : 'hover:bg-[#d5fffa] hover:font-semibold'
            }
            ${showModal ? 'opacity-0 pointer-events-none' : ''}`}
          >
            {button}
          </button>
        ))}
      </div>

      <div className='flex flex-col flex-grow bg-[#CBFCF6] overflow-hidden'>
        <div className='flex pt-6 pl-5 gap-2'>
          <input type="search" onChange={(e) => handleSearch(e.target.value)} placeholder="Pesquisar por nome, codigo de barras..." className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-80 pl-2 hover:bg-[#68dbcb]"/>
          <select id='tags' name='tags' className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-40 pl-2 hover:bg-[#68dbcb]">
            <option value="todos">Todos</option>
            <option value="todos">#creu</option>
            <option value="todos">#vrau</option>
          </select>
        </div>

        <p className='m-3 text-[#0B625D] font-semibold'>{(products.length) +" produtos"}</p>

        <div className='flex flex-col flex-grow rounded-md overflow-auto bg-[#E4FFFC] m-2 border-x-2 border-[#8BE8DC]'>
          <table className='w-full'>
            <thead className={`bg-[#8BE8DC] sticky top-0 ${showModal ? 'opacity-0 pointer-events-none' : ''}`}>
              <tr className="text-sm text-[#397F7B]">
                <th className="w-2/6">Produto</th>
                <th className="w-1/6">ID</th>
                <th className="w-1/6">Qtd</th>
                <th className="w-1/6">Custo</th>
                <th className="w-1/6">Valor venda</th>
                <th className='w-1/5'>Opçoes</th>
              </tr>
            </thead>
            <tbody className="bg-[#B8FFF7] text-xs h-full">
              {products.map((product, index) => (

                <tr key={product.id} className="border-y border-[#198A83] bg-white">
                  <td className="flex text-[#135550] font-bold text-center items-center h-12 w-full gap-3">
                      <img 
                          src={product.image || "/img/sem-foto.jpg"} 
                          alt="" 
                          className="mx-1 h-12 w-12 p-0.5 bg-[#ffffff] rounded-md object-contain object-center"
                      />
                      <p>{product.name}</p>
                  </td>
                  <td className="text-[#135550] text-center font-semibold">{product.id}</td>
                  <td className="text-[#135550] text-center font-semibold">{product.quantity}</td>
                  <td className="text-[#135550] text-center font-semibold">{"R$ "+product.cost}</td>
                  <td className="text-[#135550] text-center font-bold">{"R$ "+product.price}</td>
                  <td className="text-center text-[#135550] text-[15px]">
                      <button onClick={() => handleProduct(product.id ?? 0)} className=' m-1 hover:text-amber-500'><BiSolidPencil/></button>
                      <button onClick={() => deleteProduct(product.id ?? 0)} className=' m-1 hover:text-red-500'><FaTrash /></button>
                  </td>
              </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}