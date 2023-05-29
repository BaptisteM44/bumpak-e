
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import productImages from '../components/productImages';
import BackArrow from '../components/backArrow';

import Header from '../components/Header';
import Color from "../components/Color";

import '../styles/pages/ProductDetails.scss'

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setShowDimensions(false);
  };

  const toggleDimensions = () => {
    setShowDimensions(!showDimensions);
    setShowDescription(false);
  };
  
  useEffect(() => {
    axios.get(`/api/products/${slug}`)
      .then(response => {
        setProduct(response.data);
        setSelectedOption(response.data.option1);
        setSelectedOptionPrice(0);
      })
      .catch(error => {
        console.log(error);
      });
  }, [slug]);
  
  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    const optionPrice = options.find(option => option.name === selectedOption).price;
    setSelectedOption(selectedOption);
    setSelectedOptionPrice(optionPrice);
  };
  
  const handleColorsChange = (selectedColors) => {
    setSelectedColors(selectedColors);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const options = [];
  for (let i = 1; i <= 5; i++) {
    const option = product[`option${i}`];
    const price = i === 1 ? 0 : product[`option${i}price`];
    if (option) {
      options.push({ name: option, price: price });
    }
  }

  const productImage = productImages[product.slug.toLowerCase().replace(/ /g, '')];

  const optionString = options.map(option => `${option.name}[+${option.price}.00]`).join("|");

  return (
    <>
      <Header />
      <section className="productDetails">
        <div className="productDetails_title">
          <BackArrow onClick={handleBack} />
          <h1>{product.category}</h1>
        </div>
        <div className="productDetails_container">
          <div className="productDetails_img">
            <div id="container">
              <div id="product-svg" dangerouslySetInnerHTML={{ __html: product.svg }}>
              </div>
              <img id="background-image" src={productImages[product.image]} />
            </div>
          </div>
          <div className="productDetails_config">
            <div className="productDetails_config_firstpart">
              <div className="productDetails_config_name">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>
              <div className="productDetails_config_price">
                <p>{parseInt(product.price) + (selectedOptionPrice ? parseInt(selectedOptionPrice) : 0)}€</p>
              </div>
              {options.length > 0 && (
                <div className="config_select">
                  <label htmlFor="">Options</label>
                  <select value={selectedOption} onChange={handleOptionChange}>
                    {options.map((option, index) => (
                      <option key={index} value={option.name}>
                        {option.name} +{option.price}€
                      </option>
                    ))}
                  </select>
                  <div className="svg_select">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.8001 8L0.643175 2L8.95702 2L4.8001 8Z" fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
              )}
              <Color
                productOption="option1"
                product={product}
                onColorsChange={handleColorsChange}
              />
              <div className="config_bag">
                <button
                  className="snipcart-add-item"
                  id="frameSize"
                  data-item-id={product._id}
                  data-item-image={productImages[product.image]}
                  data-item-name={product.name}
                  data-item-price={parseInt(product.price)}
                  data-item-description={product.description}
                  data-item-custom1-name="Option"
                  data-item-custom1-options={optionString}
                  data-item-custom1-type="readonly"
                  data-item-custom1-value={selectedOption}
                  data-item-custom2-name="Colors"
                  data-item-custom2-type="readonly"
                  data-item-custom2-value={JSON.stringify(selectedColors)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="productDetails_drawer_content">
              <div className={`productDetails_drawer ${showDescription ? 'active' : ''}`} onClick={toggleDescription}>
                <div className="productDetails_title_tiroir">
                  <h2>{product.title}Features</h2>
                  <div className="productDetails_icon">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 0V10M0 5H10" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
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
                      <path d="M5 0V10M0 5H10" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
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
