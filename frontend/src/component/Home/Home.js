import React, { useEffect} from 'react';
import { Link } from "react-router-dom";
import "./CSS/Home.css";
import ProductCard from './ProductCard.js';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from 'react-alert';
import CarouselHome from './CarouselHome.js';

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products} = useSelector((state) => state.products)

    // calling product Redux[]
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <>
            {loading ? <Loader/> :
                <>
                    <MetaData title="Saahitya" />
                    <div className='banner'>
                        <CarouselHome/>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products && products.map((product) =>
                            <ProductCard key={product._id} product={product} />)}
                    </div>
                    <div className='more'>
                        {products && products.length ? (<>
                            <Link to="/products">View All Products</Link></>):(<></>)}
                    </div>
                    
                </>}
        </>
    );
}




export default Home;
