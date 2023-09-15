import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'Scheduling appointment',
    text: 'PAC allows users to set appointments, reminders, and notifications.',
  },
  {
    title: 'Weather Updates',
    text: 'PAC is capable of retrieving and providing weather updates based on user requests or location information.',
  },
  {
    title: 'Queries',
    text: 'PAC have a knowledge base to answer general knowledge questions accurately and provide relevant information',
  },
  {
    title: 'Integration',
    text: 'PAC can be integrate with external services (e.g., Google Calendar) to access, create, update, and manage events.',
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">The Future is Now and You Just Need to Realize It. Step into Future Today. & Make it Happen.</h1>
      
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
