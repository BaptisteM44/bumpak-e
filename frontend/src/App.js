import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/Pages/Home';
import ProductDetails from '../src/Pages/ProductDetails';
import Contact from './Pages/Contact';
import ProductList from './Pages/ProductList';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<ProductList />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/:category/:id" element={<ProductDetails />} />
      </Routes>
  );
}

export default App;
