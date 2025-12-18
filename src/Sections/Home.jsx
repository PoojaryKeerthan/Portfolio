import React, { useState } from 'react'
import Hero from "../Sections/Hero"
import Header from "../Sections/Header"
import Tape from "../Sections/Tape"
import Projects from "../Sections/Projects"
import About from "../Sections/About"
import Skills from "../Sections/Skills"
import Contact from "../Sections/Contact"
import Footer from "../Sections/Footer"
import { Routes, Route } from "react-router-dom";
const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className='bg-black overflow-x-clip antialiased'>
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Hero menuOpen={menuOpen} />
            <Tape />
            <Projects />
            <About />
            <Skills />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home