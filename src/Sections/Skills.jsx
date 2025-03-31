import React, { useRef } from 'react'
import ProjectTitle from '../Components/ProjectTitle'
import { services } from '../Constants'
import SkillsCard from '../Components/SkillsCard'
import { motion, useInView } from 'framer-motion'
const Skills = () => {
  const SkillsRef = useRef(null)
  const isInView = useInView(SkillsRef)
  const CardVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.2
      },
    })
  }
  return (
    <section className='py-18' id='skills' ref={SkillsRef}>
      <ProjectTitle title="My Skills" />
      <div className='custom-container mt-10 grid grid-cols-1 gap-4 md:grid-cols-2'>
        {services.map((service,index) => (
          <motion.div
          custom={index}
            variants={CardVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div key={service.title}>
              <SkillsCard service={service} />
            </div>
          </motion.div>

        ))}
      </div>
    </section>
  )
}

export default Skills