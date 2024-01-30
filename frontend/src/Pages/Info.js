import React from 'react';
import Header from '../components/Header';
import '../styles/pages/material.scss';

function Info() {
    return (
        <>
        <Header />
        <div className="productDetails_title">
            <h1>Info</h1>
        </div>
        <section className="page_material">
            <div className="material_title_part">
              <h2>SHIPPING</h2>
              <p>We ship only in Europe, Switzerland and United Kingdom included.</p>
            </div>
            <div className="material_title_part">
              <h2>DELEVERY TIME</h2>
              <p>All the bags are made to order in our workshop. The delivery time is from 1 to 5 weeks.</p>
            </div>
        </section>
        </>
    );
  }
  
  export default Info;