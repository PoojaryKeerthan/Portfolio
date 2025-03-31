import React, { useRef } from 'react'
import userImage from '../assets/Aboutsetup.png'
import ProjectTitle from '../Components/ProjectTitle'
import { motion, useInView } from 'framer-motion'
const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const ContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const imagevariants = {
    hidden: {
      x: -50,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      },
    },
  }

  const TextVariant = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8, ease: 'easeOut',
        delay: 0.2,
      },
    },
  }
  return (
    <motion.section title='About me' id='about' ref={ref}
      initial='hidden'
      variants={ContainerVariants}
      animate={isInView ? 'visible' : 'hidden'}
      className='px-4 py-18 lg:py-20'
    >
      <ProjectTitle title="About Me" />
      <div className='mt-8 flex flex-col items-center gap-10 md:mt-16 md:flex-row md:gap-3'>
        <motion.img src={userImage} alt="About image"
          className='w-full flex md:w-1/2'
          variants={imagevariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        />


        <motion.div className='custom-container flex-1 mt-10'
          variants={TextVariant}>
          initial='hidden'
          animate= {isInView ? 'visible' : 'hidden'}
          <div className='max-w-lg'>
            <h1 className='text-white/80 text-4xl md:text-5xl'>Hi,I'm <span className='text-blue-500'>Keerthan P Poojary</span></h1>
            <p className='mt-3 text-sm text-white/60 md:text-base'>
              a passionate Software Developer pursuing a Bachelor’s degree in Engineering at St. Joseph Engineering College, Mangalore.
              With a strong foundation in React, Node.js, React Native, Java, JavaScript, MongoDB, and Firebase, I specialize in building scalable web and mobile applications. I love solving complex problems through clean and efficient code, always striving to create impactful digital solutions.
              Driven by curiosity and innovation, I'm constantly exploring new technologies to enhance my skills and contribute to meaningful projects. Let's connect and build something amazing!
            </p>
          </div>
          <div>

          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default About