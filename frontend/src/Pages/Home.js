import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

import framebag from '../assets/images/framebag.jpg'
import bikepackingImage from '../assets/images/framebag.jpg';
import homepageimg from '../assets/images/homepage.jpeg';

function Home() {

    const category = 'goodies'; // la catégorie que vous souhaitez récupérer
    axios.get(`/api/products?category=${category}`)
    .then(response => {
    const products = response.data;
    console.log(products);
    // Faites quelque chose avec les produits récupérés
  })
  .catch(error => {
    console.error(error);
  });

  const [currentImage, setCurrentImage] = useState(framebag);

  const handleImageChange = (imageUrl) => {
    setCurrentImage(imageUrl);
  };

  useEffect(() => {
    let intervalId;
    const isMobile = window.innerWidth <= 768; // définir ici la largeur à partir de laquelle la page est considérée comme étant en version mobile

    if (isMobile) {
      intervalId = setInterval(() => {
        if (currentImage === homepageimg) {
          handleImageChange(bikepackingImage);
        } else {
          handleImageChange(homepageimg);
        }
      }, 4000);
    }

    return () => clearInterval(intervalId);

  }, [currentImage]);
    return (
        <>
        <Header />
        <div className="page_home">
          <div className="page_home_content">
            <div  className="home_bloc">
                <div className="home_left">
                    <Link onMouseEnter={() => handleImageChange(homepageimg)} className="link" to="/Bikepacking">Bikepacking</Link>    
                </div> 
                <div className="home_left">
                    <Link onMouseEnter={() => handleImageChange(bikepackingImage)} className="link" to="/Goodies">Goodies</Link>  
                </div>
            </div>
            <div className="home_bloc_right">
              <img src={currentImage} alt="" />
            </div>
            
          </div>
            
            
        </div>
        </>
    );
  }
  
  export default Home;
