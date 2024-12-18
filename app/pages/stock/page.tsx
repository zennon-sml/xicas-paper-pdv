"use client"
import SideBar from '@/components/SideBar/page';

import { useState } from 'react';

export default function Stock() {
  return (
    <div className='flex gap-2'>
      <SideBar />
      <h1>Stock Scren</h1>
    </div>
  );
}