import '../styles/components/Header.scss'
import { Link } from 'react-router-dom';
import React from 'react';


function Footer() {
    return (
        
        <>
           <footer>
               <div className="leftpart_footer">
                   <p>The delivery time is from 1 to 5 weeks. European shipping only.</p>
               </div>
               <div className="rightpart_footer">
                   <p>All rights reserved @ 2024</p>
                   <Link className="link" to="/Mentions">Legal notice - CGV</Link>
                   {/* <a className="link" target="_blank" href="https://baptiste-morvan.com">Made by BM</a> */}
               </div>
               
           </footer>
        </>
    );
  }
  
  export default Footer;
