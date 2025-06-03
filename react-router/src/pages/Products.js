import React from 'react';
import { Link } from 'react-router-dom';

const PRODUCTS = [ //This data will be coming from API
    {id: 'p1', title: 'Product 1'},
    {id: 'p2', title: 'Product 2'},
    {id: 'p3', title: 'Product 3'}
]

function Products() {
  return (
    <>
      <h1>Products Page</h1>
      <ul>
        {PRODUCTS.map((prod) => (
          <li><Link to={`/products/${prod.id}`}>{prod.title}</Link></li>
        ))}
      </ul>
    </>
  )
}

export default Products;