'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de vendas ao carregar a aplicação 
    router.push('/pages/sales');
  }, [router]);
  
  return (
    <div className='flex gap-2'>
      {/* <Sales /> */}
    </div>
  );
}