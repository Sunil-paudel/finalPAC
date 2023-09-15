"use client"
import ChatbotToggleButton from '@/components/ChatbotToggleButton'
import WeatherApplication from '@/components/weather/weatherapplication'
import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const page = () => {
  const session = useSession();
  const router = useRouter();
  
  
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");}
    
    if (session.status === "authenticated") 
  return (
    <div>
     <WeatherApplication />
     <ChatbotToggleButton /> 
     
    </div>
  )
}

export default page;
