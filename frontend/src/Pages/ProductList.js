import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import productImages from '../components/productImages';
import Click from '../utils/Click'

import '../styles/pages/ProductList.scss';

function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0); // initial index
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        const productsWithNames = response.data.map(product => ({
          ...product,
          name: product.name.toLowerCase().replace(/ /g, "-")
        }));
        setProducts(productsWithNames);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(products.filter(product => product.category === category));
  }, [category, products]);

  const handleMouseMove = (event) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left;
    const offsetY = event.clientY - boundingRect.top;
    setMousePosition({ x: offsetX, y: offsetY });
  }

  const getTransformStyle = () => {
    const maxOffset = 50; // maximum offset to apply to the image
    const xOffset = (mousePosition.x / 700) * maxOffset - maxOffset / 2; // calculate offset based on mouse position
    const yOffset = (mousePosition.y / 700) * maxOffset - maxOffset / 2;
    return `translate(${xOffset}px, ${yOffset}px)`; // return transform style with the calculated offsets
  }
  const { isHovering, handleMouseEnter, handleMouseLeave, handleClick } =
  Click();


  return (
    <>
      <Header />
      <section className="productList_page">
        <div className="productList_title">
          <h1>{category}</h1>
        </div>
        {filteredProducts.length > 0 && (
          <div className="productList_container">
            <div className="productList_container_bloc" onMouseMove={handleMouseMove}>
              <div  className="productList_products"  >
                {filteredProducts.map((product, index) => (
                  <div
                    className={`product_bloc ${index === currentProductIndex ? 'active' : ''}`}
                    key={product._id}
                    onMouseEnter={() => {
                      setCurrentProductIndex(index);
                      handleMouseEnter();
                    }}
                    onMouseLeave={() => {
                      setCurrentProductIndex(0);
                      handleMouseLeave();
                    }}
                    onClick={handleClick}
                  >
                    <Link to={`/${category}/${product._id}`}>
                      <p className="product">{product.name}</p>
                    </Link>
                  </div>
                ))}
              </div>  
            </div>
            
            <div className="productList_img">
              <div className="productList_img_content">
              <div className="img_content_bloc">
                <img
                  src={productImages[filteredProducts[currentProductIndex].image]}
                  alt=""
                  style={{
                    transform: getTransformStyle(),
                    transition: 'transform 1s ease-out',
                  }}
                />
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
