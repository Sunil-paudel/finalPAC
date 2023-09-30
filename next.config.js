/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      MONGO: process.env.MONGO,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GITHUB_SECRET_KEY: process.env.GITHUB_SECRET_KEY,
      CHATGPT_API_KEY: process.env.CHATGPT_API_KEY,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
      GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
      WEATHER_API: process.env.WEATHER_API,
    },
    images: {
      domains: ["images.pexels.com", "www.dropbox.com"]
    },
  };
  
  module.exports = nextConfig;
  
