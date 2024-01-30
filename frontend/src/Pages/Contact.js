
import Header from '../components/Header';
import '../styles/pages/material.scss';

function Contact() {
    return (
        <>
        <Header />
        <div className="productDetails_title">
            <h1>Contact</h1>
        </div>
        <section className="page_material">
            <div className="material_title_part">
              <h2>E-Mail</h2>
              <p>If you have any question, contact me.</p>
              <a href="mailto:bumpak034@outlook.com" >bumpak034@outlook.com</a>
            </div>
        </section>
        </>
    );
  }
  
  export default Contact;