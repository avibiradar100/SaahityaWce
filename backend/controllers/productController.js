const Product = require("../models/productModel");
const User=require("../models/userModel")
const ApiFeatures = require("../utils/apifeatures");

// Create Product
exports.createProduct = async (req, res,next) => {
    try {

        req.body.owner=req.user._id;
        const product = await Product.create(req.body);

        const user=await User.findById(req.user._id);

        user.products.push(product._id);

        await user.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product
        });
    } catch (error) {
         res.status(500).json({
            success:false,
            message:error.message
        })
    }
};


// Get all product list 
exports.getAllProducts = async(req, res, next) => {
    try{
         
        const resultPerPage = 8;
        const productsCount = await Product.countDocuments();
        // querying a keyword, filtering the data and changing page with new data in your API
        const apiFeature = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()

        let products = await apiFeature.query;

        let filteredProductsCount = products.length;

        apiFeature.pagination(resultPerPage);

        products = await apiFeature.query.clone();

        res.status(200).json({
            success: true,
            products,
            productsCount,
            filteredProductsCount
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

// Get Product Details 
exports.getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success:false,
                message:"product Not Found"
            })
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};


// Update Product
exports.updateProduct = (async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                    success:false,
                    message:"product Not Found"
            })
        }

        if(req.user._id.toString() !== product.owner.toString()){
            return res.status(403).json({
                success:false,
                message:"Unauthorized"
            })
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
});


// Delete Product
exports.deleteProduct = async (req, res, next) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success:false,
                message:"product Not Found"
            })
        }

        if(req.user._id.toString() !== product.owner.toString()){
            return res.status(403).json({
                success:false,
                message:"Unauthorized"
            })
        }
        
        await product.remove();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};


