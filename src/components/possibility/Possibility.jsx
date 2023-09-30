import React from 'react';
import Image from 'next/image';
import './possibility.css';

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      {/* Use the Image component */}
      <Image
        src="/possibility.png" 
        alt="possibility"
        width={600}
        height={400}
        priority
      />
    </div>
    <div className="gpt3__possibility-content">
      <h1 className="gradient__text">The possibilities are<br /> beyond your imagination</h1>
      <p>you can integrate any service or app with PAC.</p>
    </div>
  </div>
);

export default Possibility;
