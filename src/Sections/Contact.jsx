import React, { useRef } from 'react'
import ProjectTitle from '../Components/ProjectTitle'
import ContactImage from '../assets/contact.svg'
import { contactDetails } from '../Constants'
import ContactDetailCard from '../Components/ContactDetailCard'
import EmailCard from '../Components/EmailCard'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref);

    const fadeInVariants = {
        hidden: {
            y: 20,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            },
        },
    }

    const Staggercontainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    }
    return (
        <motion.section className='px-4 py-18 lg:py-20 ' id='contact' ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={Staggercontainer}
        >
            <ProjectTitle title="Contact Me" />
            <motion.div className='custom-container mt-10 flex flex-col gap-10 rounded-2xl border-2 border-white/10 bg-white/5 p-10 md:flex-row '>
                <motion.div className='flex flex-1 items-center justify-center'
                    variants={fadeInVariants}
                >
                    <img src={ContactImage} alt="Contact image"
                        className='h-40 md:h-60'
                    />
                </motion.div>
                <motion.div className='flex flex-1 flex-col gap-5 '
                    variants={fadeInVariants}
                >
                    <h1 className='text-3xl font-bold text-white/70 '>Get in Touch</h1>
                    <p className='text-white/60'>
                        Have a question or want to work together?
                        Feel free to to reach out via the options below
                        . I'll get back to you as soon as possible.
                    </p>
                    <div>
                        <EmailCard />
                    </div>
                    <motion.div className='flex flex-row gap-8 justify-center hover:cursor-pointer'
                        variants={Staggercontainer}
                    >
                        {contactDetails.map((contact) => (
                            <div key={contact.label}>
                                <motion.a href={contact.link} variants={fadeInVariants}><ContactDetailCard contact={contact} /></motion.a>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}

export default Contact