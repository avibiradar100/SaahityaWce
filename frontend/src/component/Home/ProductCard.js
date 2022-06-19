import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, clearErrors } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { loadUser } from "../../actions/userAction";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated, user, error, loading } = useSelector(
    (state) => state.user
  );

  const deleteProductHandler = async () => {
    alert.success("Deleting...");
    await dispatch(deleteProduct(product._id));
    await dispatch(loadUser());
    alert.success("Deleted  Successfully");
  };

  useEffect(() => {
    if (error || !isAuthenticated) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (loading === true) {
      navigate("/my/products");
    }
  }, [dispatch, error, isAuthenticated, alert, loading, navigate]);

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <span className="productPriceSpan">{`₹${product.price}`}</span>
      <p>{product.name}</p>
      {isAuthenticated && user._id === product.owner ? (
        <div className="productPriceSpan">
          <Link to={`/update/product/${product._id}`}>
            <EditIcon />
          </Link>
          <Button onClick={deleteProductHandler}>
            <DeleteIcon />
          </Button>
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
