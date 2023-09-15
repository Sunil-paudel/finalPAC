import React from 'react'
import styles from './term.module.css'; // Import the CSS module

const page = () => {
  return (
    <div>
        <div className={styles.container}>
        <h1>Terms and Conditions</h1>
        <p>
          These Terms and Conditions govern your use of PAC, the Personal Chatbot. By accessing or
          using PAC, you agree to comply with and be bound by these terms.
        </p>
        <h2>Use of Our Services</h2>
        <p>
          PAC is designed for personal use and entertainment. You may not use our services for any
          illegal, harmful, or malicious purposes.
        </p>
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. It is your responsibility to
          review them periodically for changes. Continued use of PAC after changes constitutes your
          acceptance of the updated terms.
        </p>
        <h2>Termination</h2>
        <p>
          We may terminate your access to PAC if you violate these terms or engage in any
          prohibited activities.
        </p>
      </div>
    </div>
  )
}

export default page
