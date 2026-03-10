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

  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  const handleBack = () => navigate(-1);

  const availableElastics = product
    ? [product.elastic1, product.elastic2, product.elastic3].filter(Boolean)
    : [];
  const availableParts = product
    ? [product.part1, product.part2, product.part3, product.part4, product.part5, product.part6].filter(Boolean)
    : [];

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://api.bumpak.fr/";

    axios.get(`/api/products/${slug}`)
      .then(response => {
        const data = response.data;
        setProduct(data);

        // Utilise le tableau options[] renvoyé par le backend
        const firstOption = data.options?.[0];
        setSelectedOption(firstOption?.name ?? "");
        setSelectedOptionPrice(0);

        if (data.image1) {
          setActiveImage(data.image1);
          setActiveImageIndex(0);
        } else if (data.image2) {
          setActiveImage(data.image2);
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

  const handleColorNamesChange = (newColorNames) => {
    setColorNames(newColorNames);
    handleColorsChange({ ...selectedColors, ...newColorNames });
  };

  const handleColorsChange = (newColors) => {
    setSelectedColors(newColors);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleOptionChange = (e) => {
    const name = e.target.value;
    const option = options.find(o => o.name === name);
    setSelectedOption(name);
    setSelectedOptionPrice(option?.price ?? 0);
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

  // Consomme directement le tableau options[] renvoyé par le backend (avec fallback legacy)
  const options = product.options?.length > 0
    ? product.options
    : (() => {
        const legacy = [];
        for (let i = 1; i <= 30; i++) {
          const name = product[`option${i}`];
          const price = parseFloat(product[`option${i}price`]) || 0;
          if (name) legacy.push({ name, price });
        }
        return legacy;
      })();

  const images = [
    product.image1, product.image2, product.image3,
    product.image4, product.image5, product.image6,
    product.image7, product.image8, product.image9,
  ].filter(Boolean);

  const optionString = options.map(o => `${o.name}[+${o.price}.00]`).join("|");

  return (
    <>
      <Helmet>
        <title>{product.name} - {product.category} | Bumpak</title>
        <meta name="description" content={(language === 'en' ? product.description : product.descriptionfr) || product.description} />
        <link rel="canonical" href={`${process.env.REACT_APP_WEBSITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://bumpak.fr')}/${product.category}/${product.slug}`} />

        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://bumpak.fr/${product.category}/${product.slug}`} />
        <meta property="og:title" content={`${product.name} - Custom Bikepacking Bag | Bumpak`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image1 || product.image2} />
        <meta property="og:price:amount" content={product.price} />
        <meta property="og:price:currency" content="EUR" />

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
              {images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={`${product.name} - ${product.category} - Vue ${i + 1}`}
                  loading="lazy"
                  onClick={() => handleThumbnailClick(image, i)}
                  className={`${activeImageIndex === i ? "active" : ""} loaded ${animatedImages.has(i) ? "animation-played" : ""}`}
                  onLoad={(e) => e.target.classList.add('loaded')}
                  onAnimationEnd={() => setAnimatedImages(prev => new Set([...prev, i]))}
                />
              ))}
            </div>
            <div className="main-image">
              {activeImage === product.image1 ? (
                <div id="container">
                  <div
                    id="product-svg"
                    dangerouslySetInnerHTML={{ __html: product.svg }}
                  />
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
                      <path d="M4.8001 8L0.643175 2L8.95702 2L4.8001 8Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              )}
              {(availableParts.length > 0 || availableElastics.length > 0) && (
                <Color
                  subcategory={product.subcategory}
                  productOption={selectedOption}
                  availableParts={availableParts}
                  availableElastics={availableElastics}
                  onElasticColorsChange={handleColorNamesChange}
                  selectedColors={selectedColors}
                  onColorsChange={handleColorsChange}
                  selectedColorNames={selectedColorNames}
                  onColorNamesChange={handleColorNamesChange}
                />
              )}
              <div className="config_bag">
                <button
                  className="snipcart-add-item"
                  id="frameSize"
                  data-item-id={product.id}
                  data-item-name={product.name}
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
            <div className={`productDetails_drawer ${showDescription ? 'active' : ''}`} onClick={toggleDescription}>
              <div className="productDetails_title_tiroir">
                <h2>Features</h2>
                <div className="productDetails_icon">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 0V10M0 5H10" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="productDetails_content">
                <p>
                  {product.features && product.features.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
