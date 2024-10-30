const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist'); 
const Product = require('../models/Product');   

// POST route to add a product to the wishlist
router.post('/', async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingItem = await Wishlist.findOne({ productId });
    if (existingItem) {
      return res.status(409).json({ message: 'Product already in wishlist' });
    }

    const newWishlistItem = new Wishlist({ productId });
    await newWishlistItem.save();
    res.status(201).json(newWishlistItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch all items in the wishlist
router.get('/', async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find().populate('productId');
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to remove a product from the wishlist
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const itemToDelete = await Wishlist.findOne({ productId });
    if (!itemToDelete) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    await Wishlist.findOneAndDelete({ productId });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
