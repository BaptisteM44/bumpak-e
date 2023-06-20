import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';


function Home() {
  axios.defaults.baseURL = "https://bumpak-e-production.up.railway.app";
    const category = 'goodies'; // la catégorie que vous souhaitez récupérer
    axios.get(`/api/products?category=${category}`)
    .then(response => {
    const products = response.data;
    console.log(products);
    // Faites quelque chose avec les produits récupérés
  })
  .catch(error => {
    console.error(error);
  });
    return (
        <>
        <Header />
        <div className="page_home">
          <div className="page_home_content">
            
            <div className="home_bloc_left">
              <img src="https://res.cloudinary.com/dev1phpzk/image/upload/v1684593272/homepage_jwio8y.jpg" alt="cyclist riding" />
            </div>
            <div  className="home_bloc">
                <div className="home_right">
                    <Link className="link" to="/Bikepacking">Bikepacking</Link>    
                </div> 
                <div className="home_right">
                    <Link className="link" to="/Goodies">Goodies</Link>  
                </div>
            </div>
          </div>
            
            
        </div>
        </>
    );
  }
  
  export default Home;
// import React, { useState, useRef, useEffect } from 'react';
// import { gsap } from 'gsap';

// // Importez vos images ici
// import mainImage1 from '../assets/images/barbag.png';
// import thumbnailImage1 from '../assets/images/barbag.png';
// import mainImage2 from '../assets/images/minitriangle.png';
// import thumbnailImage2 from '../assets/images/minitriangle.png';

// // Create an array of objects for your images
// const images = [
//   { main: mainImage1, thumbnail: thumbnailImage1 },
//   { main: mainImage2, thumbnail: thumbnailImage2 },
//   // add more images here if necessary
// ];

// const ProductGallery = () => {
//   const [activeImage, setActiveImage] = useState(images[0].main);
//   const imageRef = useRef(null);

//   const handleThumbnailClick = (image) => {
//       gsap.to(imageRef.current, { opacity: 0, duration: 0.2 })
//           .then(() => setActiveImage(image.main))
//           .then(() => gsap.to(imageRef.current, { opacity: 1, duration: 0.2 }));
//   };

//   return (
//       <div className="product-gallery">
//           <div className="thumbnails">
//               {images.map((image, i) => (
//                   <img key={i}
//                       src={image.thumbnail}
//                       alt=""
//                       onClick={() => handleThumbnailClick(image)} />
//               ))}
//           </div>
//           <div className="main-image">
//               <img ref={imageRef}
//                   src={activeImage}
//                   alt="" />
//           </div>
//       </div>
//   );
// }

// export default ProductGallery;