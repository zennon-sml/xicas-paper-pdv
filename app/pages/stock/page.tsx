"use client"
import SideBar from '@/components/SideBar';
import ItemStock from '@/components/StockScreen/ItemStock';
import ModalItemScreen from '@/components/StockScreen/ModalItemScreen';
import { getAllProducts, deleteProductById } from '@/app/services/productService';

import { useState, useEffect } from 'react';

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

export default function Stock() {
  const [products, setProducts] = useState<Item[]>([])
  const [selectedButton, setSelectedButton] = useState<string>('TODOS')
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productIdSelect, setProductIdSelect] = useState<number>(0);
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);
  
  useEffect(() => {
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
  }, [showModal, updateTrigger])

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
          <input type="search" placeholder="Pesquisar por nome, codigo de barras..." className="flex bg-[#8BE8DC] placeholder-[#46b0a9] text-[#0B625D] text-sm h-7 w-80 pl-2 hover:bg-[#68dbcb]"/>
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
                <ItemStock 
                  key={product.id} 
                  handleProduct={() => handleProduct(product.id)}
                  deleteProduct={() => deleteProduct(product.id)}
                  {...product} 
                />
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}