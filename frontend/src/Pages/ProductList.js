import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import productImages from '../components/productImages';
import Click from '../utils/Click';

import '../styles/pages/ProductList.scss';

function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentProductImage, setCurrentProductImage] = useState(null);  
  
  const { handleMouseEnter, handleMouseLeave, isHovering } = Click();
  axios.defaults.baseURL = "https://bumpak.onrender.com";
  useEffect(() => {
    axios.get(`/api/products?category=${category}`)
      .then(response => {
        const productsWithNames = response.data.map(product => ({
          ...product,
          name: product.name ? product.name.toLowerCase().replace(/ /g, "-") : '',
          slug: product.slug ? product.slug.toLowerCase().replace(/ /g, "-") : ''
        }));
        setProducts(productsWithNames);
  
        // Set the image of the first product as default
        if (productsWithNames.length > 0) {
          setCurrentProductImage(productImages[productsWithNames[0].image]);
        }
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

  return (
    <>
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
                          // setCurrentProductImage(productImages[product.image]);
                          setCurrentProductImage(product.image2);
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
                      alt=""
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
