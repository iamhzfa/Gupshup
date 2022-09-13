import { useEffect, useState } from "react";
import Chat from "./chat/Chat";
import "./css/app.css";
import Sidebar from "./sidebar/Sidebar";
import Pusher from 'pusher-js';
import axios from './Axios';

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(()=>{
    axios.get('/message/sync')
    .then(response => {
      console.log(response.data)
      setMessages(response.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }, []);

  useEffect(()=>{
    const pusher = new Pusher('b845a4899249d30e7e1b', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages])

  console.log(messages);

  return (
    <div className="app">
      <div className="appBody">
        {/* Sidebar */}
        <Sidebar />

        {/* Chat */}
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
