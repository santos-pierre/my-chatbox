import React, { useState, useEffect } from 'react';
import axios from "axios";
import Pusher from "pusher-js";

import ChatList from './components/ChatList';
import ChatForm from './components/ChatForm';
import NameForm from './components/NameForm';
import Header from './components/Header';
import Loader from './components/partials/Loader';
import ErrorAlert from './components/partials/ErrorAlert';

export default () => {

  Pusher.logToConsole = true;
  
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(()=>{
    if (name) {
      axios.get(`${process.env.REACT_APP_API_PATH}/chat`)
        .then(response => {
          setMessages(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
          setHasError(true);
        })
      let pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
        cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
      });
  
      pusher.subscribe('chatbox').bind('send-message',(response) => {
        setMessages((messages) => [...messages, response.message]);
      });
  
      return () => {
        pusher.unbind('send-message').unsubscribe('chatbox');
      }
    }
  },[name]);

  const onSubmitMessage = (payload, e) => {
    payload = {...payload, name};
    axios.post(`${process.env.REACT_APP_API_PATH}/chat`, payload);
    e.target.reset();
  }

  const handleSubmitName = (payload,e) => {
    setName(payload.name);
    e.target.reset();
  }

  return (
    <div className="flex h-screen justify-center items-center flex-col space-y-3 bg-gray-100">
      <ErrorAlert message='Sorry, something went wrong with the server! Please again try Later!' hasError={hasError}/>
      {
        !name &&
        <React.Fragment>
          <NameForm onSubmitName={handleSubmitName} />
          <h3 className="text-teal-500 font-semibold">Made with&nbsp;
          <a href="https://en.reactjs.org/" target="_blank" rel="noopener noreferrer"><span className="underline hover:font-bold">ReactJS</span></a>,&nbsp;
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer"><span className="underline hover:font-bold">TailwindCSS</span></a> & <a href="https://laravel.com" target="_blank" rel="noopener noreferrer"><span className="underline hover:font-bold">Laravel</span></a></h3>
        </React.Fragment> 
      } 
      {
        name &&  
        <div className="flex h-screen justify-center items-center flex-col xl:w-3/6 lg:w-4/6 md:w-5/6 w-full pt-2">
          <Header />
          {
            !isLoading ? 
              <React.Fragment>
                <ChatList messages={messages} currentName={name}/>
                <ChatForm onSubmitMessage={onSubmitMessage}/>
              </React.Fragment>
            :
            <Loader/>
          }
        </div>
      }
    </div>
    
  )
}
