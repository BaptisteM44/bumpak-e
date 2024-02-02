
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackArrow from '../components/backArrow';

import Header from '../components/Header';
import Color, { transformSelectedColors } from '../components/productDetails/Color';

import '../styles/pages/ProductDetails.scss';
import { gsap } from 'gsap';
function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  const [selectedColors, setSelectedColors] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorNames, setSelectedColorNames] = useState({});
  const [colorNames, setColorNames] = useState({});
  const transformedColors = transformSelectedColors(selectedColors, product);
  const imageRef = useRef();
  const [activeImage, setActiveImage] = useState();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const availableElastics = product ? [product.elastic1, product.elastic2, product.elastic3].filter(Boolean) : []  ;

  const availableParts = product ? [product.part1, product.part2, product.part3, product.part4, product.part5, product.part6].filter(Boolean) : [];
  
  useEffect(() => {
    console.log('Slug:', slug);
    axios.defaults.baseURL = "https://bumpak-e-production.up.railway.app/";
    axios.get(`/api/products/${slug}`)
      .then(response => {
        setProduct(response.data);
        setSelectedOption(response.data.option1);
        // setSelectedOptionPrice(0);

        // Vérification de la présence de image1
        if (response.data.image1) {
            setActiveImage(response.data.image1);
            setActiveImageIndex(0);
        } else if (response.data.image2) {
            setActiveImage(response.data.image2);
            setActiveImageIndex(1);  // Mettre à jour l'index de l'image active pour la correspondance avec image2
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [slug]);


  useEffect(() => {
    if (product) {
      console.log("Selected Option:", selectedOption);
      console.log("Selected Option Price:", selectedOptionPrice);
      console.log("Selected Colors:", selectedColors);
    }
  }, [product, selectedOption, selectedOptionPrice, selectedColors]);


  useEffect(() => {
    if (product) {
      const initialColors = availableParts.reduce((acc, part, index) => {
        acc[`product-shape${index + 1}`] = acc[`product-shape${index + 1}`] || "#FFFFFF";
        return acc;
      }, selectedColors);
  
      setSelectedColors(initialColors);
    }
  }, [product]);
  
  
  
  useEffect(() => {
    handleColorsChange({ ...selectedColors, 'part1': '#FFFFFF' }); // replace with your default color for part1
  }, []);
   const handleColorNamesChange = (newColorNames) => {
    setColorNames(newColorNames);
    handleColorsChange({ ...selectedColors, ...newColorNames });
  };
  const handleColorsChange = (newColors) => {
    console.log('newColors', newColors); // Ajoutez cette ligne pour vérifier les nouvelles couleurs
    setSelectedColors(newColors);
  };
  

  
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

 const images = [product.image1, product.image2, product.image3, product.image4,product.image5, product.image6,product.image7, product.image8, product.image9,]; // Add more images if necessary

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
            {activeImage === product.image1 ?(
                <div id="container">
                    <div
                        id="product-svg"
                        dangerouslySetInnerHTML={{ __html: product.svg }}
                    ></div>
                    <img id="background-image" src={activeImage} alt="" />
                </div>
            ) : (
                <img ref={imageRef} src={activeImage} alt="" />
            )}
        </div>
          </div>

          <div className="productDetails_config">
            <div className="productDetails_config_firstpart">
              <div className="productDetails_config_name">
                <div className="name_product_title">
                  <h2>{product.subcategory}</h2>
                  <h2>{product.name}</h2>
                </div>
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
                  />
              )}
              <div className="config_bag">
                {/* <button
                onClick={() => {
                  // Afficher les valeurs des attributs data-item-* avant d'ajouter au panier
                  console.log("Snipcart Item Data:", {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    option: selectedOption,
                    colors: JSON.stringify(transformSelectedColors(transformedColors, selectedColors)),
                  });
                }}
                  className="snipcart-add-item"
                  id="frameSize"
                  data-item-id={product._id}
                  data-item-name={product.name}
                  // data-item-name={product.name + (product.subcategory ? " " + product.subcategory : "")}
                  data-item-price={product.price}
                  data-item-url={`https://bumpak.fr/${product.category}/${product.slug}`}
                  data-item-description={product.description}
                  data-item-custom1-name="Option"
                  data-item-custom1-options={optionString}
                  data-item-custom1-type="readonly"
                  data-item-custom1-value={selectedOption}
                  data-item-custom2-name="Colors"
                  data-item-custom2-type="readonly"
                  data-item-custom2-value={JSON.stringify(transformSelectedColors(transformedColors,selectedColors,))}
                >
                  Add to Cart
                </button> */}
                <button
                onClick={() => {
                  // Afficher les valeurs des attributs data-item-* avant d'ajouter au panier
                  console.log("Snipcart Item Data:", {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    option: selectedOption,
                    colors: JSON.stringify(transformSelectedColors(transformedColors, selectedColors)),
                  });
                }}
  className="snipcart-add-item"
  id="frameSize"
  data-item-id={product._id}
  data-item-name={product.name}
  data-item-price={product.price}
  // data-item-price={parseInt(product.price) + (selectedOptionPrice ? parseInt(selectedOptionPrice) : 0)}
  data-item-url={`https://bumpak.fr/${product.category}/${product.slug}`}
  // data-item-description={product.description}
  // data-item-custom1-name="Option"
  // data-item-custom1-options={optionString}
  // data-item-custom1-type="readonly"
  // data-item-custom1-value={selectedOption}
  // data-item-custom2-name="Colors"
  // data-item-custom2-type="readonly"
  // data-item-custom2-value={JSON.stringify(transformSelectedColors(transformedColors, selectedColors))}
>
  Add to Cart
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