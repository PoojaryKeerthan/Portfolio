import React from 'react'
import HeroContent from '../Components/HeroContent'
import HeroImage from '../Components/HeroImage'
import { motion } from 'framer-motion'
const Hero = ({ menuOpen }) => {
  const ContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }
  
  const ContentVariants = {
    hidden: {
      x: -50,
      opacity: 0,
    },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 1,
          ease: 'easeOut'
        },
      },
  }

  const ImageVariant = {
    hidden: {
      y: -50,
      opacity: 0,
    },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 1, ease: 'easeOut',
          delay: 0.2,
        },
      },
  }
  return (
    <motion.section className='overflow-hidden' id='home'
    initial="hidden"
    animate="visible"
    variants={ContainerVariants}
    >
      <div className={`custom-container transition-all duration-300 ${menuOpen ? 'px-10 blur-sm' : ''}`}>
        <div className='relative flex h-screen flex-col-reverse items-center md:flex-row'>
          {/*Hero Content */}
          <HeroContent variants={ContentVariants}/>
          {/*Hero Image */}
          <HeroImage variants={ImageVariant} />
        </div>
      </div>
    </motion.section>
  )
}

export default Hero