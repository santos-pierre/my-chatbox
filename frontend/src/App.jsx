import React, { useState, useEffect } from 'react';
import axios from "axios";
import Pusher from "pusher-js";

import ChatList from './components/ChatList';
import ChatForm from './components/ChatForm';

export default () => {

  Pusher.logToConsole = true;
  
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_PATH}/chat`)
      .then(response => {
        setMessages(response.data);
      });
    let pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
    });

    pusher.subscribe('chatbox').bind('send-message',(response) => {
      setMessages((messages) => [...messages, response.message]);
    });

    return () => {
      pusher.unbind('send-message').unsubscribe('chatbox');
    }
  },[]);

  const onSubmit = (payload) => {
    axios.post(`${process.env.REACT_APP_API_PATH}/chat`, payload)
  }

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <h2 className="text-3xl">
        <span className="text-teal-500 font-semibold">React</span> - <span className="font-extrabold text-indigo-500">Tailwind</span>
      </h2>
      <ChatList messages={messages}/>
      <ChatForm onSubmit={onSubmit}/>
    </div>
  )
}
