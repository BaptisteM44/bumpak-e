import { Link } from 'react-router-dom';
import { useState } from 'react';

import '../styles/components/Header.scss'
import Click from '../utils/Click'

import Bumpak from '../assets/images/bumpak.webp'

function Header() {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);
  
    const { handleClick } =
    Click();
    return (
        <header>
            <nav className="nav">
                    <div className="nav_img">
                        <img className="nav_img_content" src={Bumpak} alt="Logo Bumpak" />
                        <Link onClick={handleClick} className="nav_img_text link" to="/">Bumpak</Link>    
                    </div>
                    <div className="nav_burger" onClick={toggleMenu}>
                        <h2>Menu</h2>
                    </div>
                <ul className={`nav_list ${showMenu ? "show" : ""}`}>
                    <li >
                        <Link onClick={handleClick} className="link" to="/Bikepacking">Bikepacking</Link>
                        <Link onClick={handleClick} className="link" to="/Goodies">Goodies</Link>
                        <Link onClick={handleClick} className="link" to="/contact">Contact</Link>
                        <Link onClick={handleClick} className="link" to="/">Cart</Link>
                    </li>
                </ul>
            </nav>
        </header>
        
    );
  }
  
  export default Header;
