import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Click from '../utils/Click';


import '../styles/pages/ProductList.scss';

function ProductList() {

  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentProductImage, setCurrentProductImage] = useState(null);
  const [currentProductName, setCurrentProductName] = useState('');

  
  const { handleMouseEnter, handleMouseLeave, isHovering } = Click();
  
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://api.bumpak.fr/";
  useEffect(() => {
    axios.get(`/api/products?category=${category}`)
      .then(response => {
        const productsWithNames = response.data.map(product => ({
          ...product,
          name: product.name ? product.name.toLowerCase().replace(/ /g, "-") : '',
          slug: product.slug ? product.slug.toLowerCase().replace(/ /g, "-") : ''
        }));
        setProducts(productsWithNames);
      })
      .catch(error => {
        console.log(error);
      });
  }, [category]);
  

  useEffect(() => {
    const subcategories = [...new Set(products.filter(product => product.category === category).map(product => product.subcategory))];
    const productsBySubcategory = subcategories.map(subcategory => ({
      name: subcategory,
      products: products.filter(product => product.category === category && product.subcategory === subcategory),
    }));
    setFilteredProducts(productsBySubcategory);
  }, [category, products]);

  const categoryDescriptions = {
    'Bikepacking': 'Handmade custom bikepacking bags: frame bags, saddle bags, top tube bags, fork bags',
    'Goodies': 'Accessories and gear for your bikepacking setup'
  };

  return (
    <>
      <Helmet>
        <title>{category} - Custom Bikepacking Bags | Bumpak</title>
        <meta name="description" content={categoryDescriptions[category] || `${category} custom bikepacking bags`} />
        <link rel="canonical" href={`${process.env.REACT_APP_WEBSITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://bumpak.fr')}/${category}`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://bumpak.fr/${category}`} />
        <meta property="og:title" content={`${category} - Bikepacking Bags | Bumpak`} />
        <meta property="og:description" content={categoryDescriptions[category]} />
        <meta property="og:image" content={currentProductImage || "https://res.cloudinary.com/dev1phpzk/image/upload/v1684593272/homepage_jwio8y.jpg"} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category} - Bikepacking Bags | Bumpak`} />
        <meta name="twitter:description" content={categoryDescriptions[category]} />
        <meta name="twitter:image" content={currentProductImage || "https://res.cloudinary.com/dev1phpzk/image/upload/v1684593272/homepage_jwio8y.jpg"} />
      </Helmet>

      <Header />
      <section className="productList_page">
        <div className="productList_title">
          <h1>{category}</h1>
        </div>
        {filteredProducts.length > 0 && (
          <div className="productList_container">
            <div className="productList_container_bloc">
              {filteredProducts.map((subcategory, subcategoryIndex) => (
                <div className="productList_subcategory" key={subcategoryIndex}>
                  <h2>{subcategory.name}</h2>
                  <div className="productList_products">
                    {subcategory.products.map((product, productIndex) => (
                      <div
                        className={`product_bloc`}
                        key={productIndex}
                        onMouseEnter={() => {
                          setCurrentProductImage(product.image8);
                          setCurrentProductName(product.name);
                          handleMouseEnter();
                        }}
                        onMouseLeave={() => {
                          handleMouseLeave();
                        }}
                      >
                        <Link to={`/${category}/${product.slug}`}>
                          <p className="product">{product.name}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="productList_img">
              <div className="productList_img_content">
                <div className="img_content_bloc">
                  {currentProductImage && (
                    <img
                      src={currentProductImage}
                      alt={`${currentProductName} - ${category} - Sac de bikepacking`}
                      loading="lazy"
                      style={{
                        transition: 'transform 1s ease-out',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ProductList;
