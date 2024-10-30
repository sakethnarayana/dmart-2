const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 


router.get('/:type', async (req, res) => {
  const productType = req.params.type;

  try {
    const products = await Product.find({ type: productType }); 

    if (products.length === 0) {
      return res.status(404).json({ message: `No products found for type: ${productType}` });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: `Error fetching products of type ${productType}`, error: error.message });
  }
});

module.exports = router;
