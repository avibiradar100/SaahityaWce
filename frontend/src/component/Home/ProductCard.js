import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, clearErrors } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { loadUser } from "../../actions/userAction";


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated,user} = useSelector(
    (state) => state.user
  );

  const {error, error: deleteError,isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = async() => {
    dispatch(deleteProduct(product._id));
    alert.success("Product Deleted Successfully");
  }

useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    if (deleteError) {
        alert.error(deleteError);
        dispatch({ type: DELETE_PRODUCT_RESET });
    }

    if (isDeleted) {
        navigate("/account");
        dispatch({
            type: DELETE_PRODUCT_RESET
        });
        dispatch(loadUser())
    }
    }, [dispatch, alert, error, navigate, deleteError,isDeleted]);


  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <span className="productPriceSpan">{`₹${product.price}`}</span>
      <p>{product.name}</p>
      {isAuthenticated && (user._id === product.owner || user.role==="admin") ? (
        <div className="productPriceSpan">
          <Link to={`/update/product/${product._id}`}>
            <EditIcon />
          </Link>
          <Link to={`/my/products`}>
            <Button onClick={deleteProductHandler}>
              <DeleteIcon />
            </Button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <div>
        <span className="span">{product.category}</span>
        <span className="span">{product.createdAt.substring(0, 10)}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
