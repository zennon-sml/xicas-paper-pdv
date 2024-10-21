import React from 'react'
import { FaShoppingCart, FaDatabase } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

import './LateralNav.css'

export default function LateralNav() {
  return (
    <div className='lateral-nav'>
        <button className='button-menu'><IoMenu /></button>
        <button><FaShoppingCart /></button>
        <button><FaDatabase /></button>
        <button></button>
    </div>
  )
}

