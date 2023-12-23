// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import BackArrow from '../components/backArrow';

// import Header from '../components/Header';
// import Color from "../components/productDetails/Color";
// import ProductImages from "../components/productDetails/productImages"
// import ProductFeaturesAndDimensions from '../components/productDetails/ProductFeaturesAndDimensions';

// import '../styles/pages/ProductDetails.scss';
// import { gsap } from 'gsap';

// function ProductDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const imageRef = useRef(null);


//   const [product, setProduct] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedOptionPrice, setSelectedOptionPrice] = useState(null);
//   const [activeImage, setActiveImage] = useState(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [selectedColors, setSelectedColors] = useState({});
//   const [selectedColorNames, setSelectedColorNames] = useState({});
//   const [colorNames, setColorNames] = useState({});
//   const options = product.options;
//   const productImages = product.images;
//   const images = product.images; // ou une autre source de données

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const availableParts = product ? [product.part1, product.part2, product.part3, product.part4, product.part5, product.part6, product.part7].filter(Boolean) : [];
  
//   const handleColorNamesChange = (newColorNames) => {
//     setColorNames(newColorNames);
//   };

//   const handleThumbnailClick = (image, index) => {
//     setActiveImageIndex(index);
//     const target = activeImage === product.image1 ? document.getElementById('container') : imageRef.current;

//     gsap.to(target, { opacity: 0, duration: 0.3 })
//       .then(() => {
//         setActiveImage(image);
        
//         gsap.to(target, { opacity: 1, duration: 0.3 });
//       });
//   };
//   const handleOptionChange = (e) => {
//     const selectedOption = e.target.value;
//     const optionPrice = options.find(option => option.name === selectedOption).price;
//     setSelectedOption(selectedOption);
//     setSelectedOptionPrice(optionPrice);
//   };

//   useEffect(() => {
//     axios.get(`/api/products/${slug}`)
//       .then(response => {
//         setProduct(response.data);
//         setSelectedOption(response.data.option1);
//         setSelectedOptionPrice(0);
//         setActiveImage(response.data.image1);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, [slug]);

//   useEffect(() => {
//     handleColorsChange({ ...selectedColors, 'part1': '#FFFFFF' }); // replace with your default color for part1
//   }, []);
  
//   const handleColorsChange = (newColors) => {
//     setSelectedColors(newColors);
//   };

//   const productImage = productImages[product.slug.toLowerCase().replace(/ /g, '')];

//   const optionString = options.map(option => `${option.name}[+${option.price}.00]`).join("|");
//   if (!product) {
//     return <div>Loading...</div>;
//   }
  
//   return (
//     <>
//       <Header />
//       <section className="productDetails">
//         <div className="productDetails_title">
//           <BackArrow onClick={handleBack} />
//           <h1>{product.category}</h1>
//         </div>


//         <div className="productDetails_container">
//         <ProductImages
//             images={images}
//             handleThumbnailClick={handleThumbnailClick}
//             activeImageIndex={activeImageIndex}
//             activeImage={activeImage}
//             product={product}
//             imageRef={imageRef}
//           />

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
//                 productOption={selectedOption}
//                 availableParts={availableParts}
//                 selectedColors={selectedColors}
//                 onColorsChange={handleColorsChange}
//                 selectedColorNames={selectedColorNames}
//                 onColorNamesChange={handleColorNamesChange} // Ajoutez ceci ici
//               />

//               <ProductFeaturesAndDimensions product={product} />

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
            
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default ProductDetails;