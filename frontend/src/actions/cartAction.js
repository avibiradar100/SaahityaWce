import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
} from "../constants/cartConstants";
import axios from "axios";

// Add Items to Cart
export const addItemsToCart = (id) => async (dispatch,getState) => {
    //Edited the url from https://saahitya-wce.onrender.com/api/v1/product/${id} to 
    ////api/v1/
   
        const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART, payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            phone:data.user.phone
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
   
}

// Remove Items to Cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {


    dispatch({
        type: REMOVE_CART_ITEM, payload:id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}
