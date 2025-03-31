import React from 'react'
import PortfolioUser from '../assets/PortfolioUser.png'
import AnimatedIcon from './AnimatedIcon'
import { BiLogoJava, BiLogoJavascript, BiLogoNodejs, BiLogoReact } from 'react-icons/bi'
import { motion } from 'framer-motion'
const HeroImage = ({variants}) => {
  return (
    <motion.div
    variants={variants} 
    className=' absolute mask-gradient right-0 top-0 h-[460px] w-full overflow-hidden rounded-bl-full rounded-br-full border-r-[10px] border-blue-500 bg-gray-700 md:h-[600px] md:w-[450px]'>
       
       <AnimatedIcon Icon={BiLogoReact} className="md:left-20 md:top-24 left-10 top-24 "/>

       <AnimatedIcon Icon={BiLogoNodejs} className="md:left-90 md:top-24 left-60 top-30"/>

       <AnimatedIcon Icon={BiLogoJavascript} className="md:left-20 md:top-64 left-10 top-70"/>

       <AnimatedIcon Icon={BiLogoJava} className="md:left-90 md:top-74 left-70 top-60"/>
        
        <img className='absolute bottom-0 left-1/2 w-[450px] -translate-x-1/2' src={PortfolioUser} alt='Image' />
    </motion.div>
  )
}

export default HeroImage