import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-2" style={{ height: '60px' }}>
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '100%' }}>
        <div className="d-flex justify-content-center flex-wrap mb-1">
          <Link to="/about" className="nav-link text-light mx-2" style={{ fontSize: '14px' }}>About Us</Link>
          <Link to="/company-profile" className="nav-link text-light mx-2" style={{ fontSize: '14px' }}>Company Profile</Link>
          <Link to="/help-support" className="nav-link text-light mx-2" style={{ fontSize: '14px' }}>Help & Support</Link>
          <Link to="/contact" className="nav-link text-light mx-2" style={{ fontSize: '14px' }}>Contact Us</Link>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/facebook" className="text-light mx-2" aria-label="Facebook">
            <FaFacebook />
          </Link>
          <Link to="/twitter" className="text-light mx-2" aria-label="Twitter">
            <FaTwitter />
          </Link>
          <Link to="/instagram" className="text-light mx-2" aria-label="Instagram">
            <FaInstagram />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;