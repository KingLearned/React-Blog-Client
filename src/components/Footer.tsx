import { Logo } from '@/shared/allAssets'
import React from 'react'

const Footer = () => {
  return (
    <footer className='w-[100%] px-5 py-5 mt-8 md:flex justify-center md:justify-between bg-gray-300'>
      <img className='w-[70px]' src={Logo} alt="Logo.png" />
      <span>Learneds Blog. &copy; 2023 All rights reserved.</span>
    </footer>
  )
}

export default Footer