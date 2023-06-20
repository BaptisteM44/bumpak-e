
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import productImages from '../components/productImages';
// import BackArrow from '../components/backArrow';

// import Header from '../components/Header';
// import Color from "../components/Color";

// import '../styles/pages/ProductDetails.scss'

// function ProductDetails() {
//   const { slug } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
//   const [selectedColors, setSelectedColors] = useState({});
//   const [showDescription, setShowDescription] = useState(false);
//   const [showDimensions, setShowDimensions] = useState(false);
//   const [coloredOptions, setColoredOptions] = useState([]);
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const toggleDescription = () => {
//     setShowDescription(!showDescription);
//     setShowDimensions(false);
//   };

//   const toggleDimensions = () => {
//     setShowDimensions(!showDimensions);
//     setShowDescription(false);
//   };
  
//   useEffect(() => {
//     axios.get(`/api/products/${slug}`)
//       .then(response => {
//         setProduct(response.data);
//         setSelectedOption(response.data.option1);
//         setSelectedOptionPrice(0);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, [slug]);
  
//   const handleOptionChange = (e) => {
//     const selectedOption = e.target.value;
//     const optionPrice = options.find(option => option.name === selectedOption).price;
//     setSelectedOption(selectedOption);
//     setSelectedOptionPrice(optionPrice);
//   };
  
//   const handleColorsChange = (selectedColors) => {
//     const colorNames = {
//       "#d0f352": "Lime Green",
//       "#2a2b2d": "Charcoal Grey",
//       "#fe251d": "Fiery Red",
//       "#96498d": "Dark Purple",
//       '#028790': "Deep Turquoise",
//       '#3f3d40': "Dark Grey",
//       '#0564c1': "Royal Blue",
//       '#921224': "Dark Red",
//       '#fab642': "Golden Yellow",
//       '#453e29': "Deep Olive",
//       '#c0005d': "Vivid Magenta",
//       '#ff0076': "Bright Pink",
//       '#835e3d': "Warm Brown",
//       '#c6c6c6': "Light Grey",
//       '#eaeaea': "Pale Grey",
//       '#092642': "Dark Blue",
//       '#162a27': "Deep Green",
//       '#5e2828': "Dark Maroon",
//       '#15174b': "Midnight Blue"
//     };
  
//     const coloredOptions = options.map(option => {
//       const color = selectedColors[option.name];
//       const colorName = colorNames[color];
//       return {
//         ...option,
//         color: colorName
//       };
//     });
  
//     setSelectedColors(selectedColors);
//     setColoredOptions(coloredOptions);
//   };
  
  

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const options = [];
//   for (let i = 1; i <= 5; i++) {
//     const option = product[`option${i}`];
//     const price = i === 1 ? 0 : product[`option${i}price`];
//     if (option) {
//       options.push({ name: option, price: price });
//     }
//   }

//   const productImage = productImages[product.slug.toLowerCase().replace(/ /g, '')];

//   const optionString = options.map(option => `${option.name}[+${option.price}.00]`).join("|");

//   return (
//     <>
//       <Header />
//       <section className="productDetails">
//         <div className="productDetails_title">
//           <BackArrow onClick={handleBack} />
//           <h1>{product.category}</h1>
//         </div>
//         <div className="productDetails_container">
//           <div className="productDetails_img">
//             {/* <div id="container">
//               <div id="product-svg" dangerouslySetInnerHTML={{ __html: product.svg }}>
//               </div>
//               <img id="background-image" src={productImages[product.image]} />
//             </div> */}

//             <div id="container">
//               <div id="product-svg" dangerouslySetInnerHTML={{ __html: product.svg }}>
//               </div>
//               <img id="background-image" src={product.image1} />
//             </div>
//           </div>
//           <div className="productDetails_config">
//             <div className="productDetails_config_firstpart">
//               <div className="productDetails_config_name">
//                 <h2>{product.name}</h2>
//                 <p>{product.description}</p>
//               </div>
//               <div className="productDetails_config_price">
//                 <p>{parseInt(product.price) + (selectedOptionPrice ? parseInt(selectedOptionPrice) : 0)}€</p>
//               </div>
//               {options.length > 0 && (
//                 <div className="config_select">
//                   <label htmlFor="">Options</label>
//                   <select value={selectedOption} onChange={handleOptionChange}>
//                     {options.map((option, index) => (
//                       <option key={index} value={option.name}>
//                         {option.name} +{option.price}€
//                       </option>
//                     ))}
//                   </select>
//                   <div className="svg_select">
//                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M4.8001 8L0.643175 2L8.95702 2L4.8001 8Z" fill="currentColor"></path>
//                     </svg>
//                   </div>
//                 </div>
//               )}
//               <Color
//   productOption="option1"
//   product={product}
//   onColorsChange={handleColorsChange}
//   availableParts={[product.part1, product.part2, product.part3, product.part4, product.part5, product.part6, product.part7].filter(Boolean)}
// />

//               <div className="config_bag">
//                 <button
//                   className="snipcart-add-item"
//                   id="frameSize"
//                   data-item-id={product._id}
//                   data-item-image={productImages[product.image]}
//                   data-item-name={product.name}
//                   data-item-price={parseInt(product.price)}
//                   data-item-description={product.description}
//                   data-item-custom1-name="Option"
//                   data-item-custom1-options={optionString}
//                   data-item-custom1-type="readonly"
//                   data-item-custom1-value={selectedOption}
//                   data-item-custom2-name="Colors"
//                   data-item-custom2-type="readonly"
//                   data-item-custom2-value={JSON.stringify(selectedColors)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//             <div className="productDetails_drawer_content">
//               <div className={`productDetails_drawer ${showDescription ? 'active' : ''}`} onClick={toggleDescription}>
//                 <div className="productDetails_title_tiroir">
//                   <h2>{product.title}Features</h2>
//                   <div className="productDetails_icon">
//                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M5 0V10M0 5H10" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="productDetails_content">
//                   <p>
//                     {product.features.split('\n').map((option, index) => (
//                       <React.Fragment key={index}>
//                         {option}
//                         <br />
//                       </React.Fragment>
//                     ))}
//                   </p>
//                 </div>
//               </div>
//               <div className={`productDetails_drawer ${showDimensions ? 'active' : ''}`} onClick={toggleDimensions}>
//                 <div className="productDetails_title_tiroir">
//                   <h2>{product.title}Dimensions</h2>
//                   <div className="productDetails_icon">
//                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M5 0V10M0 5H10" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="productDetails_content">
//                   <p>
//                     {product.dimensions.split('\n').map((option, index) => (
//                       <React.Fragment key={index}>
//                         {option}
//                         <br />
//                       </React.Fragment>
//                     ))}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default ProductDetails;
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import productImages from '../components/productImages';
import BackArrow from '../components/backArrow';

import Header from '../components/Header';
import Color from "../components/Color";

import '../styles/pages/ProductDetails.scss';

import { gsap } from 'gsap';
function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [coloredOptions, setColoredOptions] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
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
        setActiveImage(response.data.image1);
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
  const handleThumbnailClick = (image, index) => {
    setActiveImageIndex(index);
    const target = activeImage === product.image1 ? document.getElementById('container') : imageRef.current;

    gsap.to(target, { opacity: 0, duration: 0.3 })
      .then(() => {
        setActiveImage(image);
        
        gsap.to(target, { opacity: 1, duration: 0.3 });
      });
  };
  
  const handleColorsChange = (selectedColors) => {
    const colorNames = {
      "#d0f352": "Lime Green",
      "#2a2b2d": "Charcoal Grey",
      "#fe251d": "Fiery Red",
      "#96498d": "Dark Purple",
      '#028790': "Deep Turquoise",
      '#3f3d40': "Dark Grey",
      '#0564c1': "Royal Blue",
      '#921224': "Dark Red",
      '#fab642': "Golden Yellow",
      '#453e29': "Deep Olive",
      '#c0005d': "Vivid Magenta",
      '#ff0076': "Bright Pink",
      '#835e3d': "Warm Brown",
      '#c6c6c6': "Light Grey",
      '#eaeaea': "Pale Grey",
      '#092642': "Dark Blue",
      '#162a27': "Deep Green",
      '#5e2828': "Dark Maroon",
      '#15174b': "Midnight Blue"
    };

    const coloredOptions = options.map(option => {
      const color = selectedColors[option.name];
      const colorName = colorNames[color];
      return {
        ...option,
        color: colorName
      };
    });

    setSelectedColors(selectedColors);
    setColoredOptions(coloredOptions);
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

 const images = [product.image1, product.image2, product.image3, product.image4]; // Add more images if necessary

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
          <div className="thumbnails">
          {images.map((image, i) => (
  <img
    key={i}
    src={image}
    alt=""
    onClick={() => handleThumbnailClick(image, i)}
    className={activeImageIndex === i ? "active" : ""}
    style={{ opacity: activeImageIndex === i ? 1 : 0.5, cursor: activeImageIndex === i ? 'default' : 'pointer' }}
  />
))}

          </div>
          <div className="main-image">
            {activeImage === product.image1 ? (
              <div id="container">
                <div
                  id="product-svg"
                  dangerouslySetInnerHTML={{ __html: product.svg }}
                ></div>
                <img id="background-image" src={product.image1} alt="" />
              </div>
            ) : (
              <img ref={imageRef} src={activeImage} alt="" />
            )}
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
                availableParts={[product.part1, product.part2, product.part3, product.part4, product.part5, product.part6, product.part7].filter(Boolean)}
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