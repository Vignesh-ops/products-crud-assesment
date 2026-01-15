import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/layout.css';

function Navbar() {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="nav-container">
        <h1 className="brand-name">React Store</h1>
        <div className="nav-links">
          <Link 
            to="/products" 
            className={location.pathname === '/products' ? 'nav-link active' : 'nav-link'}
          >
            Products
          </Link>
          <Link 
            to="/admin" 
            className={location.pathname.includes('/admin') ? 'nav-link active' : 'nav-link'}
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
