import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './Pages/Home/HomePage';
import MapPage from './Pages/Map/MapPage';
import MarketPage from './Pages/Market/MarketPage';
import CalculatorPage from './Pages/Calculator/EcoCalculator';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-white text-denim font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;