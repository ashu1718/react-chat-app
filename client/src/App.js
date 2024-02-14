import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const ENDPOINT = '';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
  

    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
   
  }, [messages,socket]);

 
  const sendMessage = () => {
    console.log("Input Text:", inputText);
    if (inputText.trim() !== '') {
      socket.emit('message', inputText);
      setInputText('');
    }
  };

  return (
    <>
     
        <h1>Chat App</h1>
        <div className="content-class">
        <div className="output-class">
          {messages.map((message, index) => (
            <p  key={index} ><span className="message-class">{message}</span></p>
          ))}
        </div>
        <div className="input-class">
          <input
            className="form-control inputtag" id="floatingInput"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Type a Message'
          />
          <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
        
      </div>
    </>
  );
}

export default App;
