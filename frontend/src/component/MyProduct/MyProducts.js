import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors} from '../../actions/productAction';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader.js';
import MetaData from "../layout/MetaData";
import './SCSS/MyProducts.css';

const MyProducts = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading, error,isAuthenticated} = useSelector((state) => state.user);

    // Get the userId param from the URL.
    const { keyword } = useParams();


    useEffect(() => {
        if (error || !isAuthenticated) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error,isAuthenticated,alert, keyword]);


    return (
        <>
            {loading ? (<Loader />) : (<>
                <MetaData title="My Products" />
                <h2 className="productsHeading">My Products</h2>
                <div className="container">
                    {user.products && user.products.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </div>
            </>)}
        </>
    )
}

export default MyProducts;
