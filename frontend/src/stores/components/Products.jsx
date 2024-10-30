import React from 'react'
import Mobiles from './Mobiles'
import Computers from './Computers'
import Fridges from './Fridges'
import Speaker from './Speaker'
import Tvs from './Tvs'
import Acs from './Acs'

const Products = ({ searchQuery }) => {
  const products = [
    { name: 'Mobiles', component: <Mobiles /> },
    { name: 'Computers', component: <Computers /> },
    { name: 'Fridges', component: <Fridges /> },
    { name: 'Speakers', component: <Speaker /> }, 
    { name: 'TVs', component: <Tvs /> },
    { name: 'ACs', component: <Acs /> }
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <div key={index}>{product.component}</div>
        ))
      ) : (
        <p style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          No such category
        </p>
      )}
    </div>
  );
}

export default Products
