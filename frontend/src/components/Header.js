import { Link } from 'react-router-dom';
import { useState } from 'react';

import '../styles/components/Header.scss'

import Bumpak from '../assets/images/bumpak.webp'

function Header() {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);
    return (
        <header>
            <nav className="nav">
                    <div className="nav_img">
                        <img className="nav_img_content" src={Bumpak} alt="Logo Bumpak" />
                        <Link className="nav_img_text link" to="/">Bumpak</Link>    
                    </div>
                    <div className="nav_burger" onClick={toggleMenu}>
                        <h2>Menu</h2>
                    </div>
                <ul className={`nav_list ${showMenu ? "show" : ""}`}>
                    <li >
                        <Link className="link" to="/Bikepacking">Bikepacking</Link>
                        <Link className="link" to="/Goodies">Goodies</Link>
                        <Link className="link" to="/contact">Contact</Link>
                        <Link className="link snipcart-checkout" >Cart</Link>
                        <span className="snipcart-total-price linkPrice"></span>
                    </li>
                    <div>
                        
                    </div>
                </ul>
            </nav>
        </header>
        
    );
  }
  
  export default Header;
