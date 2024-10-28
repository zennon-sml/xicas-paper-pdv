"use client"
import { useState } from 'react';

import SideBar from '../components/SideBar/page';
import ProductList from '../components/ProductList/page';
import ItemProperties from '../components/ItemProperties/page';

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
    <div>
      <SideBar />
      <div className='flex flex-col h-screen'>
        <ProductList handleSelectProduct={handleSelectProduct} />
        <ItemProperties props={selectedProduct} />
      </div>
    </div>
  );
}