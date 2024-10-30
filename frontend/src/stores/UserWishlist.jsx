// UserWishlist.js
import React, { useState } from 'react';
import { useWishlist } from './context/WishlistContext';
import Navbar from './components/Navbar';
import { useCart } from './context/CartContext';

const UserWishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [added1, setAdded1] = useState(false);
  const [removed1] = useState(false);

  const handleAddToCart = (item) => {
    addToCart(item.productId);
    removeFromWishlist(item.productId._id);
    setAdded1(true);
    setTimeout(() => {
      setAdded1(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div>
        <h2 className='y-wishlist'>Your Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p className='empty'>Your wishlist is empty!!</p>
        ) : (
          <div>
            {wishlistItems.map((item) => (
              <div className='wishlistSection' key={item.productId._id}> 
                <div className="wishlist-Image">
                  <img src={item.productId.image} alt={item.productId.model} />
                </div>
                <div className="wishlist-Details">
                  <h3>{item.productId.product}</h3>
                  <h2>₹{item.productId.price}</h2>
                  <h3>{item.productId.model}</h3>
                </div>
                <button
                  className='removeBtn'
                  onClick={() => removeFromWishlist(item.productId._id)}
                >
                  Remove
                </button>
                <button className='cartBtn' onClick={() => handleAddToCart(item)}>Add to cart</button>
                {added1 && <p className="added-message-1">Item added to cart successfully!</p>}
                {removed1 && <p className="removed-message">Item removed from wishlist successfully!</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserWishlist;
