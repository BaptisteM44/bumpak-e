import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';


function Home() {
  axios.defaults.baseURL = "https://bumpak-e-production.up.railway.app";
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
    return (
        <>
        <Header />
        <div className="page_home">
          <div className="page_home_content">
            
            <div className="home_bloc_left">
              <img src="https://res.cloudinary.com/dev1phpzk/image/upload/v1684593272/homepage_jwio8y.jpg" alt="cyclist riding" />
            </div>
            <div  className="home_bloc">
                <div className="home_right">
                    <Link className="link" to="/Bikepacking">Bikepacking</Link>    
                </div> 
                <div className="home_right">
                    <Link className="link" to="/Goodies">Goodies</Link>  
                </div>
            </div>
          </div>
            
            
        </div>
        </>
    );
  }
  
  export default Home;
