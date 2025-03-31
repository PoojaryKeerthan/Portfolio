import React from 'react'
import Button from './Button'
import { motion } from 'framer-motion'
const HeroContent = ({ variants }) => {
  return (
    <motion.div
      variants={variants}
      className='text-left md:max-w-72 lg:max-w-lg z-10'>
      <p className='text-xl font-medium text-blue-300 '>Keerthan P Poojary</p>
      <h2 className='mt-4 font-serif text-3xl font-bold tracking-wide text-white/80 md:text-4xl lg:mt-8 lg:text-5xl'>Computer Science Engineer</h2>

      <p className='mt-4 text-white/40 md:text-lg '>
        Passionate about crafting seamless digital experiences, I specialize in Web Development, React, and Node.js. As a Computer Science Engineering student, I love building scalable solutions and solving complex problems through clean, efficient code.

        Always eager to learn and innovate, I strive to push boundaries and create impactful software.
      </p>
      <div className='flex items-center gap-2 mt-8 mb-4'>
        <Button onClick={() => window.location.href = "#contact"}>Contact Me</Button>
        <Button>My Resume</Button>
      </div>
    </motion.div>
  )
}

export default HeroContent