import React from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material'
function SidebarChat() {
  return (
    <div className='sidebarChat'>
      <Avatar />
      <div className="sidebarChat__info">
        <h2>스폰지밥!</h2>
        <p>안녕</p>
      </div>

    </div>

  )
}

export default SidebarChat