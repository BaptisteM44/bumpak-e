import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import productImages from '../components/productImages';

import Header from '../components/Header';
import Color from "../components/Color";
import Click from '../utils/Click'

import '../styles/pages/ProductDetails.scss'

function ProductDetails() {
  const { handleClickBag} = Click();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  // tiroirs
  const [showDescription, setShowDescription] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setShowDimensions(false);
  };

  const toggleDimensions = () => {
    setShowDimensions(!showDimensions);
    setShowDescription(false);
  };

  // récupérer les détails du produit à partir de l'API
  useEffect(() => {
    console.log(slug);
    axios.get(`/api/products/${slug}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [ slug]);
  
  
  

  if (!product) {
    return <div>Loading...</div>;
  }

  const productImage = productImages[product.slug.toLowerCase().replace(/ /g, '')];

  return (
    <>
    <Header />
      <section className="productDetails">
        <div className="productDetails_title">
          <h1>{product.category}</h1>
        </div>
        <div className="productDetails_container">
          <div className="productDetails_img">
            <div id="container">
                <div id="product-svg" dangerouslySetInnerHTML={{ __html: product.svg }} >
                </div>

                <img id="background-image" src={productImages[product.image]} alt={product.name} />
            </div>
          </div>
          
        <div className="productDetails_config">
          <div className="productDetails_config_firstpart">
            <div className="productDetails_config_name">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
            <div className="productDetails_config_price">
              <p>{product.price}€</p>
            </div>
            <Color  />
            <div className="config_bag">
              <button onClick={handleClickBag} className="snipcart-add-item"
                            id="frameSize"
                            data-item-id={product._id}
                            data-item-image={productImages[product.image]}
                            data-item-name={product.name}
                            data-item-price={product.price}
                            data-item-description={product.description}
                          >
              Add to Cart
              </button>
            </div>
          </div>
          <div className="productDetails_drawer_content">
               <div className={`productDetails_drawer ${showDescription ? 'active' : ''}`} onClick={toggleDescription}>
                 <div className="productDetails_title_tiroir">
                   <h2>{product.title}Description</h2>
                   <div className="productDetails_icon">
                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M5 0V10M0 5H10" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                     </svg>
                   </div>
                 </div>
                 <div className="productDetails_content">
                   <p>
                      {product.features.split('\n').map((option, index) => (
                        <React.Fragment key={index}>
                          {option}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                    {product.features2 && (
                      <p>
                        {product.features2.split('\n').map((option, index) => (
                          <React.Fragment key={index}>
                            {option}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                    )}
                 </div>
               </div>
               <div className={`productDetails_drawer ${showDimensions ? 'active' : ''}`} onClick={toggleDimensions}>
                 <div className="productDetails_title_tiroir">
                   <h2>{product.title}Dimensions</h2>
                   <div className="productDetails_icon">
                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M5 0V10M0 5H10" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                     </svg>
                   </div>
                 </div>
                 <div className="productDetails_content">
                  <p>
                    {product.dimensions.split('\n').map((option, index) => (
                      <React.Fragment key={index}>
                        {option}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                  <p>
                    {product.poids.split('\n').map((option, index) => (
                      <React.Fragment key={index}>
                        {option}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                 </div>
               </div>
             </div>
        </div>
        </div>
      </section>
    </>
    );
  }
    
    export default ProductDetails;