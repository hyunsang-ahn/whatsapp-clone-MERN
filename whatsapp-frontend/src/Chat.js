import { Avatar, IconButton } from '@mui/material'
import { SearchOutlined, AttachFile, MoreVert } from '@mui/icons-material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import React, { useState } from 'react'
import './Chat.css'
import axios from './axios';
function Chat({ messages }) {
  console.log('messages============', messages)
  const [input, setInput] = useState('')
  const sendMessage = async (e) => {
    e.preventDefault()
    await axios.post('/message/new', {
      "message": input,
      "name": "hyunsang",
      "timestamp": "Just now",
      "received": false
    })
    setInput('')
  }
  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>room name</h3>
          <p>Last seen at....</p>


        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>



      </div>

      <div className="chat__body">
        {messages.map((message, key) => (
          <p key={key} className={`chat__message ${message.received && "chat__reciever"}`}>
            < span className="chat__name">
              {message.name}
            </span>
            {message.message}
            < span className="chat__timestamp" >
              {message.timestamp}
            </span>

          </p>
        ))
        }



      </div >
      <div className="chat__footer">

        <InsertEmoticonIcon />
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type a message' type="text" />
          <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div >

  )
}

export default Chat