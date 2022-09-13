import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFile from '@material-ui/icons/AttachFile'
import MoreVert from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React, { useState } from 'react'
import '../css/chat.css'
import axios from '../Axios';

function Chat({messages}) {

  const[input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/message/new', {
        message: input,
        name: "kashif",
        timeStamp:"Demo time",
        received:false
    });

    setInput("");
  };

  return (
    <div className='chat'>

      <div className="chatHeader">
        <Avatar />

        <div className="chatHeader_info">
          <h3>Room name</h3>
          <p>Last seen..</p>
        </div>

        <div className="chatHeader_right">
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

      <div className="chatBody">
        {/* <p className='chatMessage'>
          <span className='chatBody_name'>Jai</span>
          This is message
          <span className='chatBody_timeStamp'>{new Date().toUTCString()}</span>
        </p> */}
        {messages.map((message)=>(
            <p key={message._id} className={`chatMessage ${message.received && 'chatReciever'}`}>
              <span className='chatBody_name'>{message.name}</span>
              {message.message}
              <span className='chatBody_timeStamp'>{message.timestamps}</span>
            </p>

        ))}
        {/* <p className='chatMessage'>
          <span className='chatBody_name'>Jai</span>
          This is message
          <span className='chatBody_timeStamp'>{new Date().toUTCString()}</span>
        </p> */}
      </div>

      <div className="chatFooter">
        <InsertEmoticonIcon />
        <form>
          <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder='Type a message'/>
          <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <MicIcon />
      </div>

    </div>
  )
}

export default Chat
