import React from 'react';
import { useEffect, useRef } from 'react';

import moment from "moment";


export default ({messages, currentName}) => {
    const bottomChat = useRef(null);

    const scrollToBottom = () => {
        bottomChat.current.scrollIntoView(
            {
                behavior: 'smooth',
                block: 'start',
              }
        );
    }

    useEffect(()=>{
        scrollToBottom();
    },[messages]);

    return (
        <div id='chatlist' className="w-full h-full px-4 flex flex-col space-y-5 mb-2 mt-4 overflow-scroll overflow-x-hidden overflow-y-scroll" 
            style={
                {
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }
        }>
            {
                messages.lenght !== 0 ? messages.map((message) => {
                    return (
                        <div key={message.id} className={`${message.name === currentName ? 'bg-teal-400' : 'bg-teal-200'} p-2 flex flex-col space-y-1`}>
                            <div className="flex space-x-2 items-baseline">
                                <span className="font-bold text-teal-700">{message.name}</span>
                                <span className="text-xs font-normal text-teal-900">{moment.unix(message.created_at).format("MMM Do YYYY H:m")}</span>
                            </div>
                            <div className="ml-3">
                                {message.message}
                            </div>
                        </div>
                    )
                }) : 
                <div className="bg-orange-200 p-2 flex flex-col space-y-1">
                    <h2 className="text-center">There is no message in this channel, be the first one to talk!</h2>
                </div>
            }
            {/* Dummy Block to croll down when update and mount */}
            <div ref={bottomChat}></div>
        </div>
    )
}