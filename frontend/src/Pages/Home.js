import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


function Home() {
    return (
        <>
        <Header />
        <div className="page_home">
          <div className="page_home_content">
            
            <div className="home_bloc_left">
              <img src="https://res.cloudinary.com/dev1phpzk/image/upload/v1684593272/homepage_jwio8y.jpg" alt="cyclist riding" />
            </div>
            <Footer />
          </div>
            
            
        </div>
        </>
    );
  }
  
  export default Home;