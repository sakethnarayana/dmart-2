// useWishlist.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const WishlistContext = createContext();


export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get('/wishlist');
        setWishlistItems(response.data);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };
    fetchWishlistItems();
  }, []);

  const addToWishlist = async (product) => {
    try {
       await axios.post('/wishlist', { productId: product._id });
      const response = await axios.get('/wishlist');
      setWishlistItems(response.data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/wishlist/${productId}`);
      setWishlistItems(wishlistItems.filter(item => item.productId._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
