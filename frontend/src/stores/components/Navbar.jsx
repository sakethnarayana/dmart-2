import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { AiFillHeart } from 'react-icons/ai';

const Navbar = ({ onSearch }) => {
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation(); // Get current route

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const isSearchEnabled = location.pathname === '/'; // Enable search only on the "/" route

  return (
    <div className='navbar-section'>
      <div className="navSection">
        <Link className='custom-link' to='/'>
          <div className="title">
            <h1>dMart</h1>
          </div>
        </Link>

        <div className="search">
          <input
            type="text"
            placeholder='Search....'
            value={searchTerm}
            onChange={handleSearchChange}
            hidden={!isSearchEnabled} // Disable if not on the "/" route
          />
        </div>

        <Link className="custom-link">
          <div className="user">
            <div className="user-details flex items-center">
              <FaUser fontSize='23px' />
              SignIn/SignUp
            </div>
          </div>
        </Link>

        <Link className="custom-link" to='/Wishlist'>
          <div className="wishlist flex items-center">
            <AiFillHeart fontSize='26px' color='black' />
            <span>Wishlist</span>
          </div>
        </Link>

        <Link className='custom-link' to='/cart'>
          <div className="cart">
            <FaShoppingCart fontSize='24px' style={{ verticalAlign: 'bottom' }} />
            <span>Cart-{cartItems.length}</span>
          </div>
        </Link>
      </div>

      <div className='subMenu'>
        <ul>
          <Link className='custom-link' to='/Mobiles'>
            <li>Mobiles</li>
          </Link>
          <Link className='custom-link' to='/Computers'>
            <li>Computers</li>
          </Link>
          <Link className='custom-link' to='/AC'>
            <li>AC</li>
          </Link>
          <Link className='custom-link' to='/TV'>
            <li>TV</li>
          </Link>
          <Link className='custom-link' to='/Fridges'>
            <li>Fridges</li>
          </Link>
          <Link className='custom-link' to='/Speakers'>
            <li>Speakers</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;