import React from 'react';
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <span className='productPriceSpan'>{`₹${product.price}`}</span>
            <p>{product.name}</p>
            <div>
                <span className='span'>{product.category}</span>
                <span className='span'>{product.createdAt.substring(0,10)}</span>
            </div>

        </Link>
    )
}

export default ProductCard;
