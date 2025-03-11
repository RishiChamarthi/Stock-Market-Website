import React from 'react'

import arrow from "../assets/arrow.png"
import background from "../assets/background.jpg"

import { useNavigate } from "react-router-dom";

const Home = () => {

  // To switch between pages
  const navigate = useNavigate();

  const invest = (() => {
    navigate(`/invest`);
  })

  // --------------------------------------------- RENDERING THE HOME COMPONENT --------------------------------------------- //
  return (
    <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${background})` }} className='px-[7%] min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white '>

      <div className='text-center max-w-[800px]'>
        <h1 className='text-[60px] font-[600] tracking-[3px]'>Invest Today.</h1>
        <h2 className='tracking-[1.5px] text-[24px] font-[700] leading-[1.25]'>How many millionaires do you know who have become wealthy by investing in savings accounts?</h2>
      </div>

      {/* Features of the website */}
      <div className='mt-[40px] flex items-center justify-center'>
        <div className='px-[20px] py-[10px] rounded-[30px] mx-[15px] border-[1px] border-white hover:bg-white hover:text-black transition-all duration-400'>Real-Time Tracking</div>
        <div className='px-[20px] py-[10px] rounded-[30px] mx-[15px] border-[1px] border-white hover:bg-white hover:text-black transition-all duration-400'>Learn & Grow</div>
        <div className='px-[20px] py-[10px] rounded-[30px] mx-[15px] border-[1px] border-white hover:bg-white hover:text-black'>Custom Watchlists</div>
        <div className='px-[20px] py-[10px] rounded-[30px] mx-[15px] border-[1px] border-white hover:bg-white hover:text-black transition-all duration-400'>AI-Powered Predictions</div>
        <div className='px-[20px] py-[10px] rounded-[30px] mx-[15px] border-[1px] border-white hover:bg-white hover:text-black transition-all duration-400'>Search Stocks</div>
      </div>

      <div className='text-center mt-[40px] text-[16px] max-w-[1200px] leading-normal'>
        <p className='tracking-[1px]'>Investing is one of the most powerful tools to secure your financial future, but it’s not a game of chance; it’s a journey of informed decisions and strategy. While the stock market offers immense opportunities, success lies in understanding the fundamentals and making research-backed investments. Remember, it’s not about quick wins but sustainable growth over time. Blind investments often lead to unnecessary risks, but with the right knowledge, patience, and tools, you can make every investment count. At Stock Watchlist, we’re here to guide you—equipping you with insights, tools, and forecasts to help you invest wisely and confidently. The market rewards those who learn and adapt—start your journey today!</p>
        <button className='bg-white text-[#212121] py-[7px] px-[15px] text-[16px] rounded-[30px] cursor-pointer border-0 outline-0 mt-[20px] inline-flex items-center justify-center hover:bg-[#4b0082] hover:text-white transition-all duration-400' onClick={invest}>Start Now <img className='w-[25px] ml-[10px]' src={arrow} alt='arrow'/></button>
      </div>
      
    </div>
  )
}

export default Home
