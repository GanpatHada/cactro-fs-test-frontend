import React from 'react'
import './Navbar.css'
const Navbar = ({setShowModal}) => {
  return (
    <nav className='flex'>
         <h1>LetsVote</h1>
         <button id='create-poll-btn' onClick={()=>setShowModal(true)}>Create Poll</button>
    </nav>
  )
}

export default Navbar
