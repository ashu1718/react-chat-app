import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const ENDPOINT = 'http://localhost:3000';

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
      <center>
        <h1>Chat App by Ashutosh Mathur</h1>
        <div>
          <input
            className="form-control inputtag" id="floatingInput"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='enter chat'
          />
          <button className="btn btn-success" onClick={sendMessage}>Send Message</button>
        </div>
         <div className="output">
          {messages.map((message, index) => (
            <h3 key={index} >{message}</h3>
          ))}
        </div>
      </center>
    </>
  );
}

export default App;
