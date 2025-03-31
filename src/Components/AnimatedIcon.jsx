import React from 'react'

const AnimatedIcon = ({Icon,className}) => {
  return (
    <div className={`flex absolute ${className} animated-icon`}>
        <Icon className='text-white/70 ' size={60}/>
    </div>
  )
}

export default AnimatedIcon