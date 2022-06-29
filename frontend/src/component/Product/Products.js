import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Pagination from "react-js-pagination";
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader.js';
import MetaData from "../layout/MetaData";
import './CSS/Products/Product.css';



const categories = [
    "Calculator",
    "Keyboard & Mouse",
    "Camera",
    "SmartPhones",
    "Laptop",
    "Books",
    "Drafter",
    "Apron",
    "other"
];

const Products = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const [category, setCategory] = useState("");

    // console.log(category);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    // Get the userId param from the URL.
    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, category));

    }, [dispatch, error, alert, keyword, currentPage,category]);

    let count = filteredProductsCount;

    // console.log(resultPerPage);
    // console.log(count);

    return (
        <>
            {loading ? (<Loader />) : (<div className='products'>
                <MetaData title="Products" />
                <h2 className="productsHeading">Products</h2>
                <div className="container">
                    {products && products.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </div>


                {/* FilterOptionsSlider*/}
                <div className="filterBox">
                
                    <Typography style={{backgroundColor:'transparent'}}>Categories</Typography>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li className="category-link"
                                key={category}
                                onClick={()=>setCategory(category)}
                            >
                            {category}
                            </li>
                    ))}
                    </ul>
                </div>

                {/* Pagination*/}

                {resultPerPage < count && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="First"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>
                )}

            </div>)}
        </>
    )
}

export default Products;
