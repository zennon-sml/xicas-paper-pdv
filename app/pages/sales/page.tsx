"use client"
import { useState } from 'react';

import SideBar from '@/components/SideBar';
import ProductList from '@/components/SalesScreen/ProductList/page';
import ItemProperties from '@/components/SalesScreen/ItemProperties/page';
import SaleList from '@/components/SalesScreen/SaleList';
import QuickAddition from '@/components/SalesScreen/QuickAddition';
import SaleCompletion from '@/components/SalesScreen/SaleCompletion';
import CRUDButtons from '@/components/SalesScreen/CRUDButtons';

interface IProduct{
  name: string;
  price: number;
  image?: string;
}

interface IItensList{
  id: number;
  name: string;
  qtd: number;
  pUnit: number;
  desconto: string;
}

export default function Sales() {
  const [selectedProduct, setSelectedProduct] = useState<IProduct>({name:"", price:0, image:""}); 
  const [itens, setItens] = useState<IItensList[]>([]);

  const handleSelectProduct = (product:IProduct) => {
    setSelectedProduct(product);
  };

  const addProductList = (item:IItensList) => {
    setItens((prevProducts) => [...prevProducts, item]);
    console.log(itens)
    setSelectedProduct({name:"", price:0, image:""})
  }

  const resetProps = () => {
    console.log(itens)
    setItens([])
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
        <SaleCompletion props={itens} resetProps={resetProps} />
      </div>

      <CRUDButtons />
    </div>
  );
}