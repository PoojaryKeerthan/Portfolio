import React from 'react'
import Logo from './Logo'
import Button from './Button'

function MobileMenu({menuOpen,setMenuOpen,menuItems}) {
  return (
    <div className={`fixed left-0 top-0 z-30 h-full w-3/4 transform border-r-2 border-white/15 bg-white/10 px-4 backdrop-blur transition-transform duration-300 ${menuOpen ? "translate-x-0" :"-translate-x-full"} `}>
        <div>
           <div className='mt-5'><Logo/></div> 
            <hr className='my-3 border-2  border-white/20'/>

            <ul className='mt-5 flex-col flex space-y-3  '>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <a href={item.href} className='nav-item px-2 py-2 '>{item.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default MobileMenu