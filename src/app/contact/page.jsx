"use client"
import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

const Contact = () => {
  const initialFormData = {
    name: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data before sending:", formData);

      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data sent successfully!");
        setFormData(initialFormData);
        setIsMessageSent(true);
      } else {
        console.error("Error sending data to the server.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt=""
            fill={true}
            className={styles.image}
            priority={false}
            sizes="(max-width: 600px) 100vw, 50vw"
          />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {isMessageSent && (
            <div className={styles.messageSent}>Message has been Sent!</div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            className={styles.textArea}
            placeholder="Message"
            cols="30"
            rows="10"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
