import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-white/5'>
        <div className='custom-container p-4 text-center '>
            <p className='text-white/40 '>&copy; {new Date().getFullYear()}Keerthan P Poojary.</p>
        </div>
    </footer>
  )
}

export default Footer