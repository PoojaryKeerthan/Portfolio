import './App.css'
import { Routes, Route } from "react-router-dom";
import DsaSheet from './Sections/DsaSheet';
import Home from './Sections/Home';
import Header from './Sections/Header';

function App() {
   return (
    <>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dsa" element={<DsaSheet />} />
    </Routes>
    </>
  )
}

export default App
