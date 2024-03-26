import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../src/Pages/Home';
import ProductDetailsBis from '../src/Pages/ProductDetailsBis';
import Contact from './Pages/Contact';
import ProductList from './Pages/ProductList';
import Info from './Pages/Info';
import Material from './Pages/Material';
import Mentions from './Pages/MentionsLegal';

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<ProductList />} />
      <Route path="/Info" element={<Info />} />
      <Route path="/Material" element={<Material />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/:category/:slug" element={<ProductDetailsBis />} />
      <Route path="/Mentions" element={ <Mentions />} />
    </Routes>
  );
}

export default App;


// import React, { useEffect } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import Home from '../src/Pages/Home';
// import ProductDetailsBis from '../src/Pages/ProductDetailsBis';
// import Contact from './Pages/Contact';
// import ProductList from './Pages/ProductList';
// import Info from './Pages/Info';
// import Material from './Pages/Material';
// import Mentions from './Pages/MentionsLegal';
// import barba from '@barba/core';
// // import '@barba/css';

// function App() {
//   const location = useLocation();

//   useEffect(() => {
//     barba.init({
//       transitions: [{
//         name: 'opacity-transition',
//         leave(data) {
//           // Ajoute la classe pour l'animation de sortie
//           data.current.container.classList.add('barba-leave');
//           return new Promise(resolve => {
//             data.current.container.addEventListener('animationend', resolve, { once: true });
//           });
//         },
//         enter(data) {
//           // Ajoute la classe pour l'animation d'entrée
//           data.next.container.classList.add('barba-enter');
//         },
//       }],
//     });
//   }, []);

//   return (
//     <Routes location={location} key={location.pathname}>
//       <Route path="/" element={<Home />} />
//       <Route path="/:category" element={<ProductList />} />
//       <Route path="/Info" element={<Info />} />
//       <Route path="/Material" element={<Material />} />
//       <Route path="/Contact" element={<Contact />} />
//       <Route path="/:category/:slug" element={<ProductDetailsBis />} />
//       <Route path="/Mentions" element={ <Mentions />} />
//     </Routes>
//   );
// }

// export default App;