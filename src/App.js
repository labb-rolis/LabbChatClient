import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';
import Typing from './typing-indicator/Typing.js';
import CustomerDropdown from './CustomerDropdown.js';
import Logo from './assets/Labb.png';

function App() {
  // Set up the WebSocket connection
  const socket = io(process.env.LCH_URL);

  // Set options for customer dropdown
  const options = [
    { value: 'ABC1234581', label: 'John Brown' },
    { value: '', label: 'Unauthenticated person' },
  ];

  // State declarations
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [customer, setCustomer] = useState(options[0].value);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const chatWindowRef = useRef();

  // Event handlers
  const handleOptionChange = async (option) => {
    setCustomer(option.value);
    setSelectedOption(option);
    await endConversation();
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const handleRadioButtonClick = (index) => {
    setSelectedIndex(index);
  };

  // useEffects

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [chat]);

  useEffect(() => {
    // Handle incoming server messages
    socket.on('serverMessage', (data, acknowledgmentCallback) => {
      console.log(data);
  
      // Set typing to false
      setTyping(false);
  
      setChat((prevChat) => {
        if (data.type === 'typing_indicator') {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
          }, 3000);
          return [...prevChat, { text: '', sender: 'server', type: 'indicator', author: data.author }];
        } else if (data.type === 'menu') {
          return [...prevChat, { choices: data.items, sender: 'server', type: 'buttons', author: data.author }];
        } else if (data.type === 'text') {
          return [...prevChat, { text: data.text, sender: 'server', type: 'text', author: data.author }];
        } else {
          return [...prevChat, { text: '', sender: 'server', type: 'not-supported', author: data.author }];
        }
      });
  
      // Acknowledge the receipt on the client side
      acknowledgmentCallback && acknowledgmentCallback();
    });
  
    return () => {
      // Clean up when component unmounts
    };
  });
  
  const sendMessageToServer = async (type, text, isPostback) => {
    const message = {
      type,
      customer_id: customer,
      // customer_name: 'David Smales',
      message_id: Date.now(),
      text: [text],
      postback: isPostback ? text : undefined,
    };
  
    try {
      socket.emit('clientMessage', message, (acknowledgment) => {
        console.log('Server acknowledgment:', acknowledgment);
      });
  
      if (type === 'text') {
        setChat((prevChat) => [...prevChat, { text, sender: 'user', type: 'text', author: customer }]);
        setInput('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const endConversation = async () => {
    await sendMessageToServer('customer_end_session');
    setChat([]);
  };
  
  const postBack = async (choice) => {
    await sendMessageToServer('text', choice, true);
  };
  
  const sendMessage = async () => {
    if (input.trim() === '') {
      return;
    }
  
    await sendMessageToServer('text', input);
  };  

  return (
    <div className='App'>
      <div className='sticky-header'>
        <img src={Logo} alt='Labb logo' className='logo'/>
      </div>

    <div className='action-bar'>
      <div className='customer-selection'>
        <CustomerDropdown options={options} selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>
      </div>
      <div className='end-conversation'>
        <button onClick={() => endConversation()}>End conversation</button> 
      </div>
      </div>
      <div ref={chatWindowRef} className='chat-window'>
        {chat.map((message, index) => (
          message.type==='text' ? (
          <div key={index} className={message.sender === 'server' ? 'bubble right' : 'bubble left'}>
            {message.text}
            <div className='author'>{message.csr_name}</div>
          </div>
          ) : message.type==='buttons' ? (
          <div key={index} className={message.sender === 'server' ? 'bubble right' : 'bubble left'}>
            {message.choices.map((choice, index) => (
              <button
              key={index}
              className={`menu-button radio-button ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => {
                postBack(choice.payload);
                handleRadioButtonClick(index);
              }}
            >
              {choice.text}
            </button>
            ))}
            </div>
          ) : null
        ))}
        {typing ? <Typing></Typing> : null}
      </div>
      <div className='input-container'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Chat with Pega...'
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
