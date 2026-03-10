import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';


function Home() {
    return (
        <>
        <Helmet>
          <title>Bumpak - Handmade Custom Bikepacking Bags</title>
          <meta name="description" content="Handmade custom bikepacking bags" />
          <link rel="canonical" href={`${process.env.REACT_APP_WEBSITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://bumpak.fr')}/`} />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://bumpak.fr/" />
          <meta property="og:title" content="Bumpak - Handmade Custom Bikepacking Bags" />
          <meta property="og:description" content="Custom handmade bikepacking bags for your cycling adventures" />
          <meta property="og:image" content="https://res.cloudinary.com/dev1phpzk/image/upload/v1684593272/homepage_jwio8y.jpg" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Bumpak - Handmade Custom Bikepacking Bags" />
          <meta name="twitter:description" content="Custom handmade bikepacking bags for your cycling adventures" />
          <meta name="twitter:image" content="https://res.cloudinary.com/dev1phpzk/image/upload/v1684593272/homepage_jwio8y.jpg" />
        </Helmet>

        <Header />
        <h1 style={{ position: 'absolute', left: '-10000px' }}>Bumpak - Handmade Custom Bikepacking Bags</h1>
        <div className="page_home">
          <div className="page_home_content">

            <div className="home_bloc_left">
              <img src="https://res.cloudinary.com/dev1phpzk/image/upload/v1684593272/homepage_jwio8y.jpg" alt="cyclist riding" loading="eager" />
            </div>
            <Footer />
          </div>
            
            
        </div>
        </>
    );
  }
  
  export default Home;