"use client"
import { useState } from 'react';

import SideBar from '../components/SideBar/page';
import ProductList from '../components/ProductList/page';
import ItemProperties from '../components/ItemProperties/page';
import SaleList from '@/components/SaleList';
import QuickAddition from '@/components/QuickAddition';
import SaleCompletion from '@/components/SaleCompletion';
import CRUDButtons from '@/components/CRUDButtons';

interface IProduct{
  name: string;
  value: number;
  image?: string;
}

interface IItensList{
  name: string;
  qtd: number;
  pUnit: number;
  desconto: number;
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<IProduct>({name:"", value:0, image:""}); 
  const [itens, setItens] = useState<IItensList[]>([]);

  const handleSelectProduct = (product:IProduct) => {
    setSelectedProduct(product);
  };

  const addProductList = (item:IItensList) => {
    setItens((prevProducts) => [...prevProducts, item]);
    console.log(itens)
  }

  return (
    <div className='flex gap-2'>
      <SideBar />

      <div className='flex flex-col h-screen w-[500px]'>
        <ProductList handleSelectProduct={handleSelectProduct} />
        <ItemProperties props={selectedProduct} addProductList={addProductList}/>
      </div>

      <div className='flex flex-col h-screen gap-2'>
        <QuickAddition />
        <SaleList saleList={itens}/>
        <SaleCompletion />
      </div>

      <CRUDButtons />
    </div>
  );
}