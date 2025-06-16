"use client"
import { useState } from 'react';

import SideBar from '@/components/SideBar';
import ProductList from '@/components/SalesScreen/ProductList/page';
import ItemProperties from '@/components/SalesScreen/ItemProperties/page';
import SaleList from '@/components/SalesScreen/SaleList';
import QuickAddition from '@/components/SalesScreen/QuickAddition';
import SaleCompletion from '@/components/SalesScreen/SaleCompletion';
import CRUDButtons from '@/components/SalesScreen/CRUDButtons';

import { Product, ProductSold, defaultProduct } from '@/app/interfaces/product';

interface IItensList{
  id: number;
  name: string;
  qtd: number;
  pUnit: number;
  desconto: string;
}

export default function Sales() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(defaultProduct); 
  const [itens, setItens] = useState<ProductSold[]>([]);

  const handleSelectProduct = (product:Product) => {
    setSelectedProduct(product);
  };

  const addProductList = (item:ProductSold) => {
    setItens((prevProducts) => [...prevProducts, item]);
    setSelectedProduct(defaultProduct); // Reset selected product after adding
  }

  const resetProps = () => {
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
        <QuickAddition addProductList={addProductList} />
        <SaleList saleList={itens}/>
        <SaleCompletion props={itens} resetProps={resetProps} />
      </div>

      <CRUDButtons />
    </div>
  );
}