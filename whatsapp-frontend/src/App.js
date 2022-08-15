import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js'
import axios from './axios'
function App() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    axios.get('/message/sync')
      .then(response => {

        setMessages(response.data)
      })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('804366273029e5fe9974', {
      cluster: 'ap3'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])


  console.log('messages===========', messages)

  return (
    <div className="app">
      <div className="app__body">

        {/* SideBar */}
        <Sidebar />

        {/* ChatBody */}
        <Chat messages={messages} />
      </div>


    </div>
  );
}

export default App;
