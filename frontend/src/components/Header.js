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
                    <Link className="nav_img link" to="/">
                        <img className="nav_img_content" src={Bumpak} height="35" width="35" alt="Logo Bumpak" />
                        <p className="nav_img_text ">Bumpak</p>
                    </Link>
                    <div className="nav_burger" onClick={toggleMenu}>
                        <h2>Menu</h2>
                    </div>
                <ul className={`nav_list ${showMenu ? "show" : ""}`}>
                    <li>
                        <Link className="link" to="/Bikepacking">Bikepacking</Link>
                    </li>
                    <li>
                        <Link className="link" to="/Goodies">Goodies</Link>
                    </li>
                    <li>
                        <Link className="link" to="/Material">Material</Link>
                    </li>
                    <li>
                        <Link className="link" to="/Info">Info</Link>
                    </li>
                    <li>
                        <Link className="link" to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link className="link snipcart-checkout" >Cart</Link>
                    </li>
                </ul>
            </nav>
        </header>
        
    );
  }
  
  export default Header;
