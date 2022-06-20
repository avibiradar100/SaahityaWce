import React from "react";
import CartItemCard from "./CartItemCard.js";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { removeItemsFromCart } from "../../actions/cartAction.js";
import { Link } from "react-router-dom";
import "./CSS/Cart/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <MetaData title={`Cart-Section -- Saahitya`} />
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Contact</p>
              <p>Price</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">{item.phone}</div>
                  <p className="cartSubtotal">{`₹${item.price}`}</p>
                </div>
              ))}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
