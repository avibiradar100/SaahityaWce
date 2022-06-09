import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails} from '../../actions/productAction';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Loader from '../layout/Loader/Loader.js';
import MetaData from "../layout/MetaData";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addItemsToCart } from "../../actions/cartAction";
import {
    Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import './SCSS/ProductDetails/ProductDetails.css';


const ProductDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {user,product,loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);


    // Get the userId param from the URL.
    const { id } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);



    const increaseQuantity = () => {
        // if stock is 5 then you can add value till 5 otherwise return it
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, reviewError, success]);

    return (
        <>
            {loading ? <Loader /> : (<>
                <MetaData title={`${product.name} -- BestShop`} />
                <div className='ProductDetails'>
                    <div>
                        <Carousel>
                            {product.images &&
                                product.images.map((item, i) => (
                                    <img
                                        className="CarouselImage"
                                        key={i}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                    />
                                ))}
                        </Carousel>
                    </div>

                    <div>
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>

                        </div>

                        <div className="detailsBlock-2">
                          <h2>Description:</h2>
                          <p>{product.description}</p>
                        </div>

                        <div className="detailsBlock-3">
                            <h2>{`₹${product.price}`}</h2>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <Button onClick={decreaseQuantity} className='button'><RemoveIcon /></Button>
                                    <input readOnly type="number" value={quantity} />
                                    <Button onClick={increaseQuantity} className='button'><AddIcon /></Button>
                                </div>
                                <Button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler} className='button'>Add to Cart</Button>
                            </div>


                            <p>
                                Status:
                                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>


                        <div className="detailsBlock-4">
                          <h2>Owner Name :</h2>
                          <p>{user.name}</p>
                        </div>

                         <div className="detailsBlock-2">
                          <h2>Owner Contact:</h2>
                          <p>Phone: {user.phone}</p>
                          <p>Email: {user.email}</p>
                        </div>

                        <Button onClick={submitReviewToggle} className='submitReview button'>Chat With Owner</Button>

                    </div>
                </div>
            </>)}
        </>
    )
}

export default ProductDetails;
