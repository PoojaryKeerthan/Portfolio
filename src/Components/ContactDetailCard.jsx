import React from 'react'

const ContactDetailCard = ({contact}) => {
  return (
    <div className='flex items-center gap-3 '>
        <span>{contact.icon}</span>
        {contact.link ? (<span href={contact.link} className='text-blue-500'>{contact.value}</span>
        ) : (<span className='text-white/70 hover:bg-amber-500'>{contact.value}</span>)}
    </div>
  )
}

export default ContactDetailCard