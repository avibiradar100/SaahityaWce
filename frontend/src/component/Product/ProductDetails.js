import React, { useEffect} from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails} from '../../actions/productAction';
import { useAlert } from "react-alert";
import { useParams ,Link} from "react-router-dom";
import Loader from '../layout/Loader/Loader.js';
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
    Button,
} from "@material-ui/core";
import './CSS/ProductDetails/ProductDetails.css';


const ProductDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {user,product,loading, error } = useSelector((state) => state.productDetails);

    const {isAutheticated}=useSelector((state)=>state.user)


    // Get the userId param from the URL.
    const { id } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id));
        alert.success("Item Added To Liked List");
    };

    const submitReviewToggle = () => {
        alert.info("Under Development..");
        alert.info("you can call directly to owner..");
    };
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);

    return (
        <>
            {loading ? <Loader /> : (<>
                <MetaData title={`${product.name} -- Saahitya`} />
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
                            <p></p>

                        </div>
                        
                        <div className="detailsBlock-3">
                            <h2>{`₹${product.price}`}</h2>
                        </div>

                        <div className="detailsBlock-2">
                          <h2>Description:</h2>
                          <p>{product.description}</p>
                        </div>

                        <div className="detailsBlock-2">
                          <h2>Owner Name:</h2>
                          {isAutheticated ?
                           (<p>{user.name}</p>):(
                            <p>**********<Link  style={{color:'blue', paddingLeft:10}} to='/login'>See Details</Link></p>
                          )}
                        </div>

                         <div className="detailsBlock-2">
                          <h2>Owner Contact:</h2>
                           {isAutheticated ?
                           (<><p>Phone: {user.phone}</p>
                            <p>Email: {user.email}</p></>):(
                            <><p>Phone:**********</p>
                            <p>Email:*******</p>
                             <Link style={{color:'blue'}} to='/login'>See Details</Link></>
                           )}
                        </div>

                        <div className="detailsBlock-2">
                          <h2>Intrested ?</h2>
                          <Button onClick={addToCartHandler} className='submitReview'>Add to Liked list</Button>
                          <Button onClick={submitReviewToggle} className='submitReview'>Notify Owner</Button>
                        </div>

                    </div>
                </div>
            </>)}
        </>
    )
}

export default ProductDetails;
