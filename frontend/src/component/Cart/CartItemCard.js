import React from 'react';
import {Link} from "react-router-dom";
import "./CSS/CartItemCard/CartItemCard.css";

const CartItemCard = ({item, deleteCartItems}) => {
    return ( 
        <div className='CartItemCard'>
            <Link replace to={`/product/${item.product}`}>
                <img src={item.image} alt="product" />
            </Link>
            <div>
                <Link replace to={`/product/${item.product}`}>{item.name} </Link>
                <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
            </div> 
        </div>
    )
}

export default CartItemCard

