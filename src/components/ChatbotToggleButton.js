'use client'
import React, { useState } from 'react';
import Chatbot from '@/components/QA/minichatbot'; // Import your chatbot component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons'; // Import the Font Awesome icon

const ChatbotToggleButton = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 3,
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  };

  const miniChatbotStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 2,
    width: '300px',
    height: '500px',
    backgroundColor: 'gray',
    color: 'white',
    display: isChatbotOpen ? 'block' : 'none',
    overflow: 'auto', // Add this line for scrolling
    margin:'auto',
    padding:'auto',
  };

  return (
    <>
      {isChatbotOpen && <div></div>}
      <button onClick={toggleChatbot} style={buttonStyle}>
        <FontAwesomeIcon icon={faComment} />
      </button>
      <div style={miniChatbotStyle}>
        {/* Mini chatbot content */}
        <Chatbot />
      </div>
    </>
  );
};

export default ChatbotToggleButton;
