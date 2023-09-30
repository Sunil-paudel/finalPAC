"use client"
import ChatbotToggleButton from '@/components/ChatbotToggleButton'
import WeatherApplication from '@/components/weather/weatherapplication'
import React from 'react'
const page = () => {
  return (
    <div>
     <WeatherApplication />
     <ChatbotToggleButton /> 
     
    </div>
  )
}

export default page;