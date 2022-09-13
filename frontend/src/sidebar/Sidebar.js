import React from 'react'
import '../css/sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import {Avatar, IconButton} from '@material-ui/core'
import SidebarChat from './SidebarChat'

function Sidebar() {
  return (
    <div className='sidebar'>

      <div className="sidebarHeader">
        
      <div className="sidebarHeader_left">
        <Avatar src='https://avatars.githubusercontent.com/u/88678264?s=400&u=8b0773e602d6cd464a66c77873c006c7d4052143&v=4'/>
      </div>

        <div className="sidebarHeader_right">
          <IconButton>
          <DonutLargeIcon />
          </IconButton>
          <IconButton>
          <ChatIcon />
          </IconButton>
          <IconButton>
          <MoreVertIcon />
          </IconButton>
        </div>

      </div>

      <div className="sidebarSearch">
        <div className="sidebarSearch_container">
          <SearchOutlined />
          <input type="text" placeholder='Search or start mew chat' />
        </div>
      </div>

      <div className="sidebarChat_container">
        <h2>Add new chat</h2>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>

    </div>
  )
}

export default Sidebar
