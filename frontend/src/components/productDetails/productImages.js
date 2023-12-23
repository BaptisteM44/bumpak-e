// import React from 'react';

// function ProductImages({ images, handleThumbnailClick, activeImageIndex, activeImage, product, imageRef }) {
//   return (
//     <div className="productDetails_img">
//       <div className="thumbnails">
//         {images.map((image, i) => (
//           <img
//             key={i}
//             src={image}
//             alt=""
//             onClick={() => handleThumbnailClick(image, i)}
//             className={activeImageIndex === i ? "active" : ""}
//             style={{ opacity: activeImageIndex === i ? 1 : 0.5, cursor: activeImageIndex === i ? 'default' : 'pointer' }}
//           />
//         ))}
//       </div>
//       <div className="main-image">
//         {activeImage === product.image1 ? (
//           <div id="container">
//             <div
//               id="product-svg"
//               dangerouslySetInnerHTML={{ __html: product.svg }}
//             ></div>
//             <img id="background-image" src={product.image1} alt="" />
//           </div>
//         ) : (
//           <img ref={imageRef} src={activeImage} alt="" />
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductImages;
