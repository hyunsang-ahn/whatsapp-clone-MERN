import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVerIcon from '@mui/icons-material/MoreVert';

import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar__header">

        <div className="sidebar__headerRight">
          <Avatar src="https://pyxis.nymag.com/v1/imgs/7aa/21a/c1de2c521f1519c6933fcf0d08e0a26fef-27-spongebob-squarepants.rsquare.w700.jpg" />
          <IconButton >
            <DonutLargeIcon />
          </IconButton>
          <IconButton >
            <ChatIcon />
          </IconButton>
          <IconButton >
            <MoreVerIcon />
          </IconButton>
        </div>



      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">

          <SearchOutlined />
          <input placeholder='Search or Start new chat' type="text" />          </div>


      </div>
      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />

      </div>
    </div >
  )
}

export default Sidebar