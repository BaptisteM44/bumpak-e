// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import productImages from '../components/productImages';

// import Header from '../components/Header';
// import Color from "../components/Color";

// import '../styles/pages/ProductDetails.scss'

// function ProductDetails() {
//   const { slug } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
//   const [custom1Option, setCustom1Option] = useState(null);
//   const [inCart, setInCart] = useState(false);

//   // tiroirs
//   const [showDescription, setShowDescription] = useState(false);
//   const [showDimensions, setShowDimensions] = useState(false);

//   const toggleDescription = () => {
//     setShowDescription(!showDescription);
//     setShowDimensions(false);
//   };

//   const toggleDimensions = () => {
//     setShowDimensions(!showDimensions);
//     setShowDescription(false);
//   };

//   // récupérer les détails du produit à partir de l'API
//   useEffect(() => {
//     axios.get(`/api/products/${slug}`)
//       .then(response => {
//         setProduct(response.data);
//         setSelectedOption(response.data.option1);
//         setSelectedOptionPrice(0); // Pas de coût supplémentaire pour l'option1
//         const custom1Option = `${response.data.option1}:${selectedOption}`;
//         setCustom1Option(custom1Option);
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
//       if (inCart) {
//         // Force la mise à jour de l'option si le produit est déjà dans le panier
//         setInCart(false);
//         setTimeout(() => setInCart(true), 0);
//       }
//     };
      
    
//       if (!product) {
//         return <div>Loading...</div>;
//       }
//       const options = [];
//       for (let i = 1; i <= 5; i++) {
//         const option = product[`option${i}`];
//         const price = i === 1 ? 0 : product[`option${i}price`]; // aucun coût supplémentaire pour l'option1
//         if (option) {
//           options.push({ name: option, price: price });
//         }
//       }
      
      
//       const productImage = productImages[product.slug.toLowerCase().replace(/ /g, '')];
    
//       // create option string based on product options
//       let optionString = product.option1;
//       for (let i = 2; i <= 5; i++) {
//         const option = product[`option${i}`];
//         if (option) {
//           optionString += `|${option}[+${product[`option${i}price`]}.00]`;
//         }
//       }
    
      
//       return (
//         <>
//           <Header />
//           <section className="productDetails">
//             <div className="productDetails_title">
//               <h1>{product.category}</h1>
//             </div>
//             <div className="productDetails_container">
//               <div className="productDetails_img">
//                 <div id="container">
//                   <div id="product-svg" dangerouslySetInnerHTML={{ __html: product.svg }}>
//                   </div>
//                   <img id="background-image" src={productImages[product.image]} alt={product.name} />
//                 </div>
//               </div>
//               <div className="productDetails_config">
//                 <div className="productDetails_config_firstpart">
//                   <div className="productDetails_config_name">
//                     <h2>{product.name}</h2>
//                     <p>{product.description}</p>
//                   </div>
//                   <div className="productDetails_config_price">
//                     <p>{parseInt(product.price) + (selectedOptionPrice ? parseInt(selectedOptionPrice) : 0)}€</p>
//                   </div>
//                   {options.length > 0 && (
//                     <div className="config_select">
//                       <label htmlFor="">Options</label>
//                       <select value={selectedOption} onChange={handleOptionChange}>
//                         {options.map((option, index) => (
//                           <option key={index} value={option.name}>
//                             {option.name} (+{option.price}€)
//                           </option>
//                         ))}
//                       </select>
//                       <div className="svg_select">
//                         <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M4.8001 8L0.643175 2L8.95702 2L4.8001 8Z" fill="currentColor"></path>
//                         </svg>
//                       </div>
//                     </div>
//                   )}
//                   <Color productOption="option1" product={product} onChange={handleOptionChange} selectedOption={selectedOption} />
//                   <div className="config_bag">
//                     <button
//                       className="snipcart-add-item"
//                       id="frameSize"
//                       data-item-id={product._id}
//                       data-item-image={productImages[product.image]}
//                       data-item-name={product.name}
//                       data-item-price={parseInt(product.price)}

//                       data-item-description={product.description}
//                       data-item-custom1-name="Option"
//                       data-item-custom1-options={optionString}
//                       data-item-custom1-value={selectedOption} // Utilisez directement selectedOption ici
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//                 <div className="productDetails_drawer_content">
//                   <div className={`productDetails_drawer ${showDescription ? 'active' : ''}`} onClick={toggleDescription}>
//                     <div className="productDetails_title_tiroir">
//                       <h2>{product.title}Description</h2>
//                       <div className="productDetails_icon">
//                         <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M5 0V10M0 5H10" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
//                         </svg>
//                       </div>
//                     </div>
//                     <div className="productDetails_content">
//                       <p>
//                         {product.features.split('\n').map((option, index) => (
//                           <React.Fragment key={index}>
//                             {option}
//                             <br />
//                           </React.Fragment>
//                         ))}
//                       </p>
//                       {product.features2 && (
//                         <p>
//                           {product.features2.split('\n').map((option, index) => (
//                             <React.Fragment key={index}>
//                               {option}
//                               <br />
//                             </React.Fragment>
//                           ))}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <div className={`productDetails_drawer ${showDimensions ? 'active' : ''}`} onClick={toggleDimensions}>
//                     <div className="productDetails_title_tiroir">
//                       <h2>{product.title}Dimensions</h2>
//                       <div className="productDetails_icon">
//                         <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M5 0V10M0 5H10" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
//                         </svg>
//                            </div>
//        </div>
//        <div className="productDetails_content">
//        <p>
//        {product.dimensions.split('\n').map((option, index) => (
//       <React.Fragment key={index}>
//       {option}
//       <br />
//       </React.Fragment>
//       ))}
//       </p>
//       <p>
//       {product.poids.split('\n').map((option, index) => (
//       <React.Fragment key={index}>
//       {option}
//       <br />
//       </React.Fragment>
//       ))}
//       </p>
//       </div>
//       </div>
//       </div>
//       </div>
//       </div>
//       </section>
//       </>
//       );
//       }
      
//       export default ProductDetails;
    

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import productImages from '../components/productImages';

import Header from '../components/Header';
import Color from "../components/Color";

import '../styles/pages/ProductDetails.scss'

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
  const [custom1Option, setCustom1Option] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [optionColors, setOptionColors] = useState({});


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
    axios.get(`/api/products/${slug}`)
      .then(response => {
        setProduct(response.data);
        setSelectedOption(response.data.option1);
        setSelectedOptionPrice(0);
        const custom1Option = `${response.data.option1}:${selectedOption}`;
        setCustom1Option(custom1Option);
  
        const colors = {};
        for (let i = 1; i <= 5; i++) {
          const optionName = response.data[`option${i}`];
          const optionColor = response.data[`option${i}color`];
          if (optionName && optionColor) {
            colors[`product-shape${i}`] = optionColor;
          }
        }
        setOptionColors(colors);
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
    if (inCart) {
      // Force la mise à jour de l'option si le produit est déjà dans le panier
      setInCart(false);
      setTimeout(() => setInCart(true), 0);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  
  const options = [];
  for (let i = 1; i <= 5; i++) {
    const option = product[`option${i}`];
    const price = i === 1 ? 0 : product[`option${i}price`]; // aucun coût supplémentaire pour l'option1
    if (option) {
      options.push({ name: option, price: price });
    }
  }

  const productImage = productImages[product.slug.toLowerCase().replace(/ /g, '')];

  // create option string based on product options
  let optionString = product.option1;
  for (let i = 2; i <= 5; i++) {
    const option = product[`option${i}`];
    if (option) {
      optionString += `|${option}[+${product[`option${i}price`]}.00]`;
    }
  }

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
              <div id="product-svg" dangerouslySetInnerHTML={{ __html: product.svg }}>
              </div>
                <img id="background-image" src={productImages[product.image]} />
              </div>
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
                          {option.name} (+{option.price}€)
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
                {/* <Color productOption="option1" product={product} onChange={handleOptionChange} selectedOption={selectedOption} /> */}
                <Color
  productOption="option1"
  product={product}
  onChange={handleOptionChange}
  selectedOption={selectedOption}
  selectedColor={selectedColor}
  onColorChange={setSelectedColor}
  optionColors={optionColors}
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
  data-item-custom1-value={selectedOption}
  data-item-custom2-name="Color"
  data-item-custom2-value={selectedColor}
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
  