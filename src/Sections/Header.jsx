import React from 'react'
import { BiLogoGraphql, BiMenuAltRight, BiX } from 'react-icons/bi'
import { menuItems } from '../Constants'
import Button from '../Components/Button'
import MobileMenu from '../Components/MobileMenu'
import Logo from '../Components/Logo'
import { motion } from 'framer-motion'
const Header = ({menuOpen,setMenuOpen}) => {
    const logoVariants={
        hidden: { scale: 0,opacity:0},
        visible: { scale:1,opacity: 1, y: 0 ,
            transition:{
                duration: 1,
                ease: "easeOut"
            }
        }
    }
    const menuVariants = {
        hidden: { opacity: 1},
        visible: { opacity: 1,
            transition:{
                staggerChildren:0.2,
                ease:"easeOut",
            }
         }
    }
    const menuItemsVariants = {
        hidden:{
            y:-20,
            opacity:0,
        },
        visible: {
            y:0,
            opacity:1,
            transition:{
                duration: 0.5,
            }
        }
    }
  return (
    <>
    <motion.header className='fixed top-0 z-10 w-full px-4 py-4 lg:px-40'
    initial="hidden"
    animate="visible"
    >
        <nav className='container flex items-center justify-between rounded-full border-2 
        border-white/10 bg-white/10 p-1.5 backdrop:blur'>
            <motion.div className='flex items-center '
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            >
                <Logo/>
            </motion.div>
            <motion.ul className='hidden space-x-4 md:flex'
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            >
                {
                    menuItems.map((item,index)=>(
                        <motion.li key={index}
                        variants={menuItemsVariants}
                        >
                            <a className='nav-item' href={item.href}>{item.label}</a>
                        </motion.li>
                    ))
                }
            </motion.ul>
            <motion.div className='hidden md:block'
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            >
               
            </motion.div>

            <motion.button className='text-4xl text-white md:hidden cursor-pointer'
            onClick={()=>setMenuOpen(!menuOpen)}
            aria-label='Toggle Menu'
            aria-expanded={menuOpen}
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            >
                {
                    menuOpen ? <BiX/> : <BiMenuAltRight/>
                }
            </motion.button>
        </nav>
    </motion.header>

    {menuOpen && (<div className='fixed inset-0 z-20 bg-black opacity-50'
     onClick={()=>setMenuOpen(!menuOpen)}
     aria-label='Close Menu'
    />)}
    
    <MobileMenu menuOpen={menuOpen} 
    setMenuOpen={setMenuOpen}
    menuItems={menuItems}
    />
    </>
  )
}

export default Header