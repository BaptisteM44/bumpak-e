import React from 'react';

function ProductFeaturesAndDimensions({ product }) {
  if (!product) {
    return null;
  }

  return (
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
  );
}

export default ProductFeaturesAndDimensions;
