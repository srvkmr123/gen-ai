import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const addMessage = (content, role = 'user') => {
    const newMessage = { content, role, timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleUserInput = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    addMessage(input, 'user');
    // You can handle the user's input and generate a bot response here.
    // For simplicity, we're just responding with a static message.
    addMessage('Sorry, I am a simple chatbot and cannot process your request.', 'bot');

    setInput('');
  };

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ padding: '8px', textAlign: message.role === 'bot' ? 'left' : 'right' }}>
            <strong>{message.role === 'bot' ? 'Chatbot' : 'You'}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '8px' }}>
        <input type="text" value={input} onChange={handleUserInput} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
