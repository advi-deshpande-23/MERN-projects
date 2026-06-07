// ProductCard.jsx

import React from 'react'
import { Link } from 'react-router-dom';


const ProductCard = ({ data }) => {

  const {
    id,
    title,
    price,
    category,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    thumbnail
  } = data;

  return (
    <Link to = {`/product/${id}`} className="product-card">

      <div className="product-image">
        <img src={thumbnail} alt={title} />
      </div>

      <div className="product-details">

        <p className="product-category">{category}</p>

        <h2 className="product-title">{title}</h2>

        <p className="product-brand">
          Brand : <span>{brand}</span>
        </p>

        <div className="product-price-section">
          <h3>$ {price}</h3>

          <span className="discount">
            {discountPercentage}% OFF
          </span>
        </div>

        <div className="product-extra">

          <p>⭐ {rating}</p>

          <p className={stock < 20 ? "low-stock" : "in-stock"}>
            {stock} items left
          </p>

        </div>

        <div className="product-tags">
          {
            tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))
          }
        </div>

        <button>Add To Cart</button>

      </div>

    </Link>

    //LINK is used to navigate to different routes without reloading the page, unlike anchor tags. It is a part of react-router-dom library.
  )
}

export default ProductCard