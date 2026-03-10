import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import BackArrow from '../components/backArrow';

import Header from '../components/Header';
import Color, { transformSelectedColors } from '../components/productDetails/Color';

import '../styles/pages/ProductDetails.scss';
import { gsap } from 'gsap';
function ProductDetails() {
  const { slug } = useParams();
  const imageRef = useRef();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  const [selectedColors, setSelectedColors] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorNames, setSelectedColorNames] = useState({});
  const [colorNames, setColorNames] = useState({});
  const transformedColors = transformSelectedColors(selectedColors, product);

  const [activeImage, setActiveImage] = useState();
  const [animatedImages, setAnimatedImages] = useState(new Set());

  const handleBack = () => {
    navigate(-1);
  };
  const availableElastics = product ? [product.elastic1, product.elastic2, product.elastic3].filter(Boolean) : []  ;

  const availableParts = product ? [product.part1, product.part2, product.part3, product.part4, product.part5, product.part6].filter(Boolean) : [];
  
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://api.bumpak.fr/";
  
    axios.get(`/api/products/${slug}`)
      .then(response => {
        // Affichez les données reçues pour vérification  
        setProduct(response.data);
        setSelectedOption(response.data.option1);
        setSelectedOptionPrice(0);
  
        // Vérifiez la première image et définissez l'image active
        if (response.data.image1) {
          setActiveImage(response.data.image1);
          setActiveImageIndex(0);
        } else if (response.data.image2) {
          setActiveImage(response.data.image2);
          setActiveImageIndex(1);
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données du produit :", error);
      });
  }, [slug]);

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };
  // useEffect(() => {
  //   if (product) {
  //     const initialColors = availableParts.reduce((acc, part, index) => {
  //       acc[`product-shape${index + 1}`] = acc[`product-shape${index + 1}`];
  //       return acc;
  //     }, selectedColors);
  
  //     setSelectedColors(initialColors);
  //     applyColorsToSVG(initialColors); // Appliquer les couleurs initiales
  //   }
  // }, [product]);
  
  
  
  
  useEffect(() => {
    handleColorsChange({ ...selectedColors }); // replace with your default color for part1
  }, []);
   const handleColorNamesChange = (newColorNames) => {
    setColorNames(newColorNames);
    handleColorsChange({ ...selectedColors, ...newColorNames });
  };
  const handleColorsChange = (newColors) => {
    
    setSelectedColors(newColors);
  };
  
  // const resetToFirstImage = () => {
  //   setActiveImageIndex(0);
  //   setActiveImage(product.image1);
  //   applyColorsToSVG(selectedColors); // Appliquer les couleurs lors de la réinitialisation de l'image

  // };
  
  
  const toggleDescription = () => {
    setShowDescription(!showDescription);
    // setShowDimensions(false);
  };
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
  if (!product) {
    return <div>Loading...</div>;
  }

  const options = [];
  for (let i = 1; i <= 30; i++) {
    const option = product[`option${i}`];
    const price = i === 1 ? 0 : product[`option${i}price`];
    if (option) {
      options.push({ name: option, price: price });
    }
  }
  // const applyColorsToSVG = (colors) => {
  //   const svgElement = document.getElementById("product-svg");
  //   if (svgElement) {
  //     Object.keys(colors).forEach(className => {
  //       const elements = svgElement.querySelectorAll("." + className);
  //       const color = colors[className];
  //       elements.forEach(element => {
  //         element.style.fill = color;
  //       });
  //     });
  //   }
  // };
  
 const images = [product.image1, product.image2, product.image3, product.image4,product.image5, product.image6,product.image7, product.image8, product.image9,]; // Add more images if necessary

  const optionString = options.map(option => `${option.name}[+${option.price}.00]`).join("|");
  
  return (
    <>
      <Helmet>
        <title>{product.name} - {product.category} | Bumpak</title>
        <meta name="description" content={(language === 'en' ? product.description : product.descriptionfr) || product.description} />
        <link rel="canonical" href={`${process.env.REACT_APP_WEBSITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://bumpak.fr')}/${product.category}/${product.slug}`} />

        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://bumpak.fr/${product.category}/${product.slug}`} />
        <meta property="og:title" content={`${product.name} - Custom Bikepacking Bag | Bumpak`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image1 || product.image2} />
        <meta property="og:price:amount" content={product.price} />
        <meta property="og:price:currency" content="EUR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} - ${product.category}`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.image1 || product.image2} />
      </Helmet>

      <Header />
      <section className="productDetails">
        <div className="productDetails_title">
          <BackArrow onClick={handleBack} />
          <h1>{product.category}</h1>
        </div>
        <div className="productDetails_container">
          <div className="productDetails_img">
            <div className="thumbnails">
            {images.filter(Boolean).map((image, i) => (
              <img
                key={i}
                src={image}
                alt={`${product.name} - ${product.category} - Vue ${i + 1}`}
                loading="lazy"
                onClick={() => handleThumbnailClick(image, i)}
                className={`
                  ${activeImageIndex === i ? "active" : ""}
                  loaded
                  ${animatedImages.has(i) ? "animation-played" : ""}
                `}
                onLoad={(e) => {
                  e.target.classList.add('loaded');
                }}
                onAnimationEnd={(e) => {
                  setAnimatedImages(prev => new Set([...prev, i]));
                }}
              />
            ))}

            </div>
          <div className="main-image">
            {activeImage === product.image1 ?(
                <div id="container">
                    <div
                        id="product-svg"
                        dangerouslySetInnerHTML={{ __html: product.svg }}
                    ></div>
                    <img id="background-image" src={activeImage} alt={`${product.name} - Personnalisable - ${product.category}`} loading="eager" />
                </div>
            ) : (
                <img ref={imageRef} src={activeImage} alt={`${product.name} - ${product.category}`} loading="eager" />
            )}
        </div>
          </div>

          <div className="productDetails_config">
            <div className="productDetails_config_firstpart">
              <div className="productDetails_config_name">
                <div className="name_product_title">
                  <h2>{product.name}</h2>
                </div>
                <div onClick={handleLanguageToggle} className="lang-toggle">
                  {language === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
                </div>
                <p>
                {(language === 'en' ? product.description : product.descriptionfr)?.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              </div>
              <div className="productDetails_config_price">
                <p>{(parseFloat(product.price) + (selectedOptionPrice ? parseFloat(selectedOptionPrice) : 0)).toFixed(2)}€</p>
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
              {(availableParts.length > 0 || availableElastics.length > 0) && (
                  <Color 
                      subcategory={product.subcategory}
                      productOption={selectedOption}
                      availableParts={availableParts}
                      availableElastics={availableElastics.length > 0 ? availableElastics : []} // N'affichez pas les élastiques s'ils ne sont pas présents
                      onElasticColorsChange={handleColorNamesChange}
                      selectedColors={selectedColors}
                      onColorsChange={handleColorsChange}
                      selectedColorNames={selectedColorNames}
                      onColorNamesChange={handleColorNamesChange}
                      // applyColorsToSVG={applyColorsToSVG} // Passer la fonction ici
                      // resetToFirstImage={resetToFirstImage} 
                  />
              )}
              <div className="config_bag">
                <button
                  className="snipcart-add-item"
                  id="frameSize"
                  data-item-id={product.id}
                  data-item-name={product.name}
                  // data-item-price={parseInt(product.price) + (selectedOptionPrice ? parseInt(selectedOptionPrice) : 0)}
                  data-item-price={product.price}
                  data-item-url={`${process.env.REACT_APP_API_URL || 'https://api.bumpak.fr'}/api/products/${product.slug}`}

                  data-item-description={product.description}
                  data-item-custom1-name="Option"
                  data-item-custom1-options={optionString}
                  data-item-custom1-type="readonly"
                  data-item-custom1-value={selectedOption}
                  data-item-custom2-name="Colors"
                  data-item-custom2-type="readonly"
                  data-item-custom2-value={JSON.stringify(transformSelectedColors(transformedColors, selectedColors))}
                  >
                  <span>Add to Cart</span> 
                </button>
              </div>
            </div>
            {/* <div className="productDetails_drawer_content"> */}
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
                    {product.features && product.features.split('\n').map((option, index) => (
                      <React.Fragment key={index}>
                        {option}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>

              </div>
            {/* </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
