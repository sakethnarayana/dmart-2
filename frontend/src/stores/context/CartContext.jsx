import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create CartContext
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Add item to cart
  const addToCart = async (product) => {
    try {
      await axios.post('/cart', {
        productId: product._id 
      });
      const response = await axios.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`);
      const response = await axios.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // Decrease item quantity in cart
  const decreaseQuantity = async (productId) => {
    try {
       await axios.put(`/cart/${productId}`);
       const response = await axios.get('/cart');
      setCartItems(response.data);
      
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
