const mongoose = require('mongoose');
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// List of JSON files to upload
const jsonFiles = [
  'Mobile-Data.json',
  'Computer-Data.json',
  'AC-Data.json',
  'TV-Data.json',
  'Fridge-Data.json',
  'Speaker-Data.json'
];

mongoose.connect('mongodb+srv://dinesh:eJtfvxT12FOd0MNm@cluster0.c0wmc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    uploadData();
  })
  .catch(err => console.log("MongoDB connection error:", err));

// Function to upload data from all JSON files
const uploadData = async () => {
  for (const file of jsonFiles) {
    try {
      const filePath = path.join(__dirname, '../assets', file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      await Product.insertMany(data);
      console.log(`${file} data uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${file}:`, error);
    }
  }
  mongoose.connection.close();
}; 