// Footer.jsx
import Image from 'next/image';
import React from 'react';
import styles from './footer.module.css';

import Link from 'next/link';

const Footer = () => (
  
    <div className={styles.gpt3__footer} >
    <div className={styles.gpt3__footer_links}>
      <div className={styles.gpt3__footer_links_logo}>
      <Link href="/" className={styles.logo}>
      <Image
            src="/logo.png"
            alt="logo"
            priority
            height={61} width={83}
           
          />
      </Link>
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
        <p><Link href="tel:+61413177566">call us</Link></p>
        <p>
          <Link href="mailto:paudelsunil16@gmail.com">
              Contact via Email
            </Link>
        </p>
      </div>
    </div>

    <div className={styles.gpt3__footer_copyright}>
      <p>@2023 Sunil chandra paudel, All rights reserved.</p>
    </div>
  </div>

);

export default Footer;
