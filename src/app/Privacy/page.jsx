import React from 'react'
import styles from './PrivacyPolicy.module.css'; // Import the CSS module

const page = () => {
  return (
    <div>
      <div className={styles.container}>
        <h1>Privacy Policy</h1>
        <p>
          This Privacy Policy explains how PAC, the Personal Chatbot, collects, uses, and protects
          your personal information when you interact with our services.
        </p>
        <h2>Information We Collect</h2>
        <p>
          PAC may collect and store information such as your name, email address, and chat history
          for the purpose of improving our services and providing you with a personalized experience.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          We use your information to enhance your chatbot interactions, improve our services, and
          respond to your inquiries. Your data is securely stored and is not shared with third
          parties without your consent.
        </p>
        <h2>Security</h2>
        <p>
          We take data security seriously and have implemented measures to protect your personal
          information. However, no method of transmission or storage is 100% secure, and we cannot
          guarantee absolute security.
        </p>
      </div>
    
    </div>
  )
}

export default page

