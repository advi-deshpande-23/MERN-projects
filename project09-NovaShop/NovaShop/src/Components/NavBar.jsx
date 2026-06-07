// NavBar.jsx
import React from 'react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to = "/" className="navbar-logo">
        <h2>NovaShop</h2>
      </Link>

      <SearchBar/>

      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/">Products</a>
        <a href="/">Categories</a>
      </div>

      <div className="navbar-cart">
        🛒 Cart
      </div>
    </nav>
  );
};

export default NavBar;