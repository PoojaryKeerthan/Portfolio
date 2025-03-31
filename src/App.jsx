import { useState } from 'react'
import './App.css'
import Header from './Sections/Header'
import Hero from './Sections/Hero';
import Projects from './Sections/Projects';
import Tape from './Sections/Tape';
import About from './Sections/About';
import Skills from './Sections/Skills';
import Contact from './Sections/Contact';
import Footer from './Sections/Footer';

function App() {
  const [menuOpen,setMenuOpen] = useState(false);
   return (
    <>
      <div className='bg-black overflow-x-clip antialiased'>
       <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
       <Hero menuOpen={menuOpen} />
       <Tape/>
       <Projects/>
       <About/>
       <Skills/>
       <Contact/>
       <Footer/>
      </div>
    </>
  )
}

export default App
