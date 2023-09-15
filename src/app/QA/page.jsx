"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ChatBot from '@/components/QA/ChatBot';
import ChatbotToggleButton from '@/components/ChatbotToggleButton';
const QA = () => {
 const session = useSession();

  const router = useRouter();
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
   router?.push("/dashboard/login");
  }
  if (session.status === "authenticated"){
    const OPENAI_API_KEY = process.env.CHATGPT_API_KEY;
  return (
    <div className="center-container">
      <ChatBot />
      <ChatbotToggleButton /> 
    </div>
  )}
};

export default QA
