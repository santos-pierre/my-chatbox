import React from 'react';


export default ({messages}) => {
    return (
        <div>
            <h1>I am a chat List</h1>
            <ul>
                {messages.map((message) => {
                    return <li key={message.id}>{message.message}</li>
                })}
            </ul>
        </div>
    )
}