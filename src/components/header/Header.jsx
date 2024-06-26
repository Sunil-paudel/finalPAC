import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './header.css';


const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Welcome to your favorite Personal Assistant Chat-bot PAC</h1>

      <div className="gpt3__header-content__input">
        <Link href="/QA">
          <button type="button">Get Started</button>
        </Link>
      </div>

      <div className="gpt3__header-content__people">
        {/* Use the Image component */}
        <Image src="/people.png"
        alt="people" 
        priority  
        height={100} width={100}
        />
        <p>1,600 people requested access a visit in the last 24 hours</p>
      </div>
    </div>

    <div className="gpt3__header-image">
      {/* Use the Image component */}
      <Image src='/ai.png' alt="ai-pic" priority width={836} height={844}/>
    </div>
  </div>
);

export default Header;
