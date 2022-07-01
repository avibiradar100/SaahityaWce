import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { loadUser} from '../../actions/userAction';
import "./CSS/NewProduct/NewProduct.css";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success,product} = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Calculator",
        "SmartPhones",
        "Laptop",
        "Books",
        "Drafter",
        "Apron",
        "Keyboard",
        "Mouse",
        "Camera",
        "other"
   ];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Product Created Successfully");
            dispatch(loadUser());
            navigate(`/product/${product._id}`);
            dispatch({type: NEW_PRODUCT_RESET});
        }
    }, [dispatch, alert, error, success, product,navigate]);


    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
       
        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createProduct(myForm));

    }
   
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        // first it make empty array
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <>
         {loading ?<Loader /> : <>
            <MetaData title="Create Product" />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create New Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <CurrencyRupeeIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                name="price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                name="description"
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                             <select onChange={(e) => setCategory(e.target.value)} required>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <p>Select 1 or multiple product images </p>
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                required
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </>}
        </>
    )
}

export default NewProduct;
