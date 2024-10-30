import React from 'react'
import Navbar from '../stores/components/Navbar'
import {computerData} from '../stores/data/computers'
import { useParams } from 'react-router-dom'
import { useCart } from '../stores/context/CartContext'
import { useState } from 'react'
import { useWishlist } from '../stores/context/WishlistContext'

const ComputerSingle = () => {
    const {id} = useParams()
    const { addToCart} = useCart()
    const { addToWishlist} = useWishlist()
    const product = computerData.find((item)=>item._id === id)
    const [added1, setAdded1] = useState(false);
    const [added2, setAdded2] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAdded1(true);
    setTimeout(() => {
      setAdded1(false);
    }, 2000);
  };
  const handleWishlist = (product) => {
    addToWishlist(product);
    setAdded2(true);
    setTimeout(() => {
      setAdded2(false);
    }, 2000);
  };
  return (
    <>
    <Navbar></Navbar>
    <div className='ind-section'>
       <div className='ind-image'>
        <img src={product.image} alt="" />
       </div>
       <div className="ind-details space">
        <div className="ind-company space">
        <h2>{product.company}</h2>
        </div>
       <div className="ind-model space">
        <h3>{product.model}</h3>
       </div>
       <div className="ind-price space">
        <h3>${product.price}</h3>
       </div>
       <div className="ind-desc space">
        {product.description}
       </div>
       <div className="ind-button space">
       <div style={{ display: 'flex', gap: '10px' }}>
       <button onClick={() => handleAddToCart(product)}>Add to cart</button>
       <button onClick={() => handleWishlist(product)}>Add to Wishlist</button>
       </div>
       {added1 && (
              <p className="added-message">Item added to cart successfully!</p>
            )}
       {added2 && (
              <p className="added-message">Item added to wishlist successfully!</p>
            )}
       </div>
       
       </div>
       
    </div>
    </>
  )
}

export default ComputerSingle