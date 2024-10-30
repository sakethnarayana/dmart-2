import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Products from '../components/Products'

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} ></Navbar>
      <Products searchQuery={searchQuery}></Products>
     
    </div>
  )
}

export default LandingPage
