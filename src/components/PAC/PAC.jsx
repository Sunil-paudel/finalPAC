import React from 'react';
import Feature from '../../components/feature/Feature';
import './PAC.css';

const PAC = () => (
  <div className="gpt3__PAC section__margin" id="wgpt3">
    <div className="gpt3__PAC-feature">
      <Feature title="What is PAC" text="PAC is a smart and friendly chat-bot that can help you with your daily tasks and queries. Whether you need to schedule an appointment, check the weather, or learn something new, PAC is here to assist you. PAC can understand and process natural language inputs, provide scheduling functionality, retrieve and provide weather updates, answer general knowledge questions, integrate with external calendar and to-do list services, and manage multi-turn conversations. PAC is more than just a chatbot, it’s your personal assistant. Try PAC today and see the difference! 😊." />
    </div>
    <div className="gpt3__PAC-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
      
    </div>
    <div className="gpt3__PAC-container">
      <Feature title="Chatbots" text="PAC can be used as chat-friend" />
      <Feature title="Knowledgebase" text="PAC can be used to quench your curiosity" />
      <Feature title="Education" text="PAC can be used to provide education" />
    </div>
  </div>
);

export default PAC;
