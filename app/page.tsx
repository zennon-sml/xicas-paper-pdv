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

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<IProduct>({name:"", value:0, image:""}); 

  const handleSelectProduct = (product:IProduct) => {
    setSelectedProduct(product);
  };

  return (
    <div className='flex gap-2'>
      <SideBar />
      <div className='flex flex-col h-screen w-[500px]'>
        <ProductList handleSelectProduct={handleSelectProduct} />
        <ItemProperties props={selectedProduct} />
      </div>
      <div className='flex flex-col h-screen gap-2'>
        <QuickAddition />
        <SaleList />
        <SaleCompletion />
      </div>
      <CRUDButtons />
    </div>
  );
}