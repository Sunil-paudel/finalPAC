// Footer.jsx
import Image from 'next/image';
import React from 'react';
import styles from './footer.module.css';
import logo from './logo.PNG';
import Link from 'next/link';

const Footer = () => (
  
    <div className={styles.gpt3__footer} >
    <div className={styles.gpt3__footer_links}>
      <div className={styles.gpt3__footer_links_logo}>
      <Image src={logo} alt="logo" height={61} width={83} priority={false} />
        <p>Group 2, VU - 2023 block 5, Sydney Campus, <br /> All Rights Reserved</p>
      </div>
      
      <div className={styles.gpt3__footer_links_div}>
      <Link href="https://www.vu.edu.au/about-vu"><h4>VU</h4></Link>
        <Link href="/termsandconditions"><p>Terms & Conditions</p></Link>
        <Link href="/Privacy"><p>Privacy Policy</p></Link>
        <p>Contact</p>
      </div>
      <div className={styles.gpt3__footer_links_div}>
        <h4>Get in touch</h4>
        <p>Group 2, VU - 2023 block 5, Sydney Campus</p>
        <p>0413177566</p>
        <p>paudelsunil16@gmail.com</p>
      </div>
    </div>

    <div className={styles.gpt3__footer_copyright}>
      <p>@2023 Sunil chandra paudel, All rights reserved.</p>
    </div>
  </div>

);

export default Footer;
