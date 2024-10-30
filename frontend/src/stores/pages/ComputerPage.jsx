import React, { useState } from 'react';
import { computerData } from '../data/computers';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const ComputerPage = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [sortOrder, setSortOrder] = useState(''); // State for sorting

  const brandHandler = (obj) => {
    if (selectedProduct.includes(obj)) {
      setSelectedProduct(selectedProduct.filter(item => item !== obj));
    } else {
      setSelectedProduct([...selectedProduct, obj]);
    }
  };

  const uniqueCompanies = [...new Set(computerData.map(item => item.brand))];

  // Filter products based on selected companies
  const filteredProduct = selectedProduct.length === 0 
    ? computerData 
    : computerData.filter((it) => selectedProduct.includes(it.brand));

  // Sort the filtered products based on sortOrder
  const sortedProducts = [...filteredProduct].sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price; // Sort by price low to high
    }
    if (sortOrder === 'highToLow') {
      return b.price - a.price; // Sort by price high to low
    }
    return 0; // No sorting
  });

  return (
    <>
      <Navbar />
      <div className="fullPage">
        <div className="pro-selected">
          {uniqueCompanies.map((brand) => (
            <div className='pro-input' key={brand}>
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedProduct.includes(brand)}
                  onChange={() => brandHandler(brand)} 
                />
                {brand}
              </label>
            </div>
          ))}
          &nbsp;
          &nbsp;
          &nbsp;
          <hr />
          &nbsp;
          &nbsp;
          &nbsp;
          <div className="sort-menu">
            <label htmlFor="sortSelect">Sort by: </label>
            <select 
              id="sortSelect" 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Select</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <div className='pageSection'>
          {sortedProducts.map((item) => (
            <div className='sec' key={item._id}>
              <Link to={`/Computers/${item._id}`}>
                <div className="pageImg">
                  <img className='img' src={item.image} alt="" />
                </div>
              </Link>
              <div className="proModel">
                <strong>{item.brand}</strong> <br />
                {item.model} <br />
                ₹{item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ComputerPage;
