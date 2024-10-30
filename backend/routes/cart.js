const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product'); 
const router = express.Router();

// Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId } = req.body; 
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cartItem = await Cart.findOne({ productId: productId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
      return res.status(200).json(cartItem); 
    } else {
      const newCartItem = new Cart({ productId, quantity: 1 });
      await newCartItem.save();
      return res.status(201).json(newCartItem); 
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get cart items
router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId'); 
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId; // Get the product ID from the request parameters
    
    // Find the cart item by product ID
    const cartItem = await Cart.findOne({ productId: productId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Remove the item from the cart completely
    await Cart.findByIdAndDelete(cartItem._id);
    return res.status(204).send(); // Send a 204 No Content response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New PUT endpoint to decrement quantity
router.put('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId; // Get the product ID from the request parameters
    const cartItem = await Cart.findOne({ productId: productId });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (cartItem.quantity > 1) {
      // If quantity is greater than 1, decrement the quantity
      cartItem.quantity -= 1;
      await cartItem.save(); // Save the updated cart item
      return res.status(200).json(cartItem); // Return the updated cart item
    } else {
      // If quantity is 1, remove the item from the cart
      await Cart.findByIdAndDelete(cartItem._id);
      return res.status(204).send(); // Send a 204 No Content response
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
