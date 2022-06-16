import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector} from "react-redux";

const ProductCard = ({ product }) => {

    const {isAuthenticated,user} = useSelector((state) => state.user);
    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <span className='productPriceSpan'>{`₹${product.price}`}</span>
            <p>{product.name}</p>
            {isAuthenticated && user._id === product.owner ? 
                (<div className='productPriceSpan'>
                    <Link to={`/update/product/${product._id}`}>
                        <EditIcon />
                    </Link>
                    <Button>
                        <DeleteIcon />
                    </Button>
                </div>)
                :(<></>)
            }
            <div>
                <span className='span'>{product.category}</span>
                <span className='span'>{product.createdAt.substring(0,10)}</span>
            </div>

        </Link>
    )
}

export default ProductCard;
