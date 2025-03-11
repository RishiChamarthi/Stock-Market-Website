import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'
import Home from './components/Home'
import Invest from './components/Invest'
import Watchlist from './components/Watchlist';
import SearchStock from './components/SearchStock';
import ContactUs from './components/ContactUs';
import StockPrediction from './components/StockPrediction';

const App = () => {

  // ---------- RENDERING THE APP COMPONENT ---------- //
  return (
    <Router>
      
      <div className='font-outfit'> {/* using the imported google font (see index.js and tailwind.config.js) */}
        
        <Navbar />

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/stockpredictor" element={<StockPrediction />} />
          <Route path="/stockinfo/:stockname" element={<SearchStock />} />
        </Routes>

      </div>
      
    </Router>
  )
  
}

export default App
