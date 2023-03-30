import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../src/Pages/Home';
import ProductDetails from '../src/Pages/ProductDetails';
import Contact from './Pages/Contact';
import ProductList from './Pages/ProductList';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const location = useLocation();

  const RouteWithTransition = ({ component: Component, ...rest }) => (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={1300} classNames="fade">
        <Component {...rest} />
      </CSSTransition>
    </TransitionGroup>
  );

  return (
    <Routes>
      <Route path="/" element={<RouteWithTransition component={Home} />} />
      <Route path="/:category" element={<RouteWithTransition component={ProductList} />} />
      <Route path="/Contact" element={<RouteWithTransition component={Contact} />} />
      <Route path="/:category/:productName" element={<RouteWithTransition component={ProductDetails} />} />
    </Routes>
  );
}


export default App;
