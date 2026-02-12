import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/* ======================================================
   @desc    Create Product (ADMIN)
   @route   POST /api/v1/products
   @access  Private (Admin)
====================================================== */

const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        discountPrice,
        category,
        countInStock,
        isFeatured,
        variants, // ← add this
    } = req.body;

    if (!name || !price || !category || !description) {
        throw new ApiError(400, "Required product fields are missing");
    }
    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "Product image is required");
    }

    // Parse variants if it's a JSON string (frontend sends as FormData string)
    let parsedVariants = [];
    if (variants) {
        try {
            parsedVariants = JSON.parse(variants);
        } catch (error) {
            throw new ApiError(400, "Variants format is invalid");
        }
    }

    const images = [];

    for (const file of req.files) {
        const result = await uploadOnCloudinary(file.path);

        if (!result) {
            throw new ApiError(500, "Image upload failed");
        }

        images.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    const product = await Product.create({
        name,
        description,
        price,
        discountPrice,
        category,
        variants: parsedVariants, // ← use parsed variants
        countInStock,
        isFeatured,
        createdBy: req.user._id, // ADMIN USER
        images,
    });

    res
        .status(201)
        .json(new ApiResponse(201, product, "Product created successfully"));
});

/* ======================================================
   @desc    Get All Products (with filters)
   @route   GET /api/v1/products
   @access  Public
====================================================== */

const getAllProducts = asyncHandler(async (req, res) => {
    const { category, featured, search } = req.query;

    let filter = { isActive: true };

    if (category) {
        filter.category = category;
    }

    if (featured === "true") {
        filter.isFeatured = true;
    }

    if (search) {
        filter.name = { $regex: search, $options: "i" } // $options: "i" means ignoring case sensative
    }

    const products = await Product.find(filter)
        .populate("category", "name slug")
        .sort({ createdAt: -1 });

    res
        .status(200)
        .json(new ApiResponse(200, products, "Product fetched successfully"))
})

/* ======================================================
   @desc    Get Single Product by Slug
   @route   GET /api/v1/products/:slug
   @access  Public
====================================================== */
const getProductBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const product = await Product.findOne({ slug, isActive: true });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    res
        .status(200)
        .json(new ApiResponse(200, product, "Product fetched successfully"))
})


/* ======================================================
   @desc    Update Product (ADMIN)
   @route   PUT /api/v1/products/:id
   @access  Private (Admin)
====================================================== */

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const {
        name,
        description,
        price,
        discountPrice,
        category,
        variants,
        countInStock,
        isFeatured,
        isActive
    } = req.body;

    // find product
    const product = await Product.findById(id)

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // update image if new file exist
    if (req.files && req.files.length > 0) {

        const images = [];

        for (const file of req.files) {
            const result = await uploadOnCloudinary(file.path);

            images.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
        product.images = images;

    }

    // update fields (only if provided)
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.variants = variants || product.variants;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (countInStock !== undefined) product.countInStock = countInStock;
    product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;

    product.isActive =
        isActive !== undefined ? isActive : product.isActive;

    // save product
    const updatedProduct = await product.save();

    res.status(200).json(
        new ApiResponse(200, updatedProduct, "Product updated successfully")
    );
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    product.isActive = false;
    await product.save();

    res.status(200).json(
        new ApiResponse(200, null, "Product deleted successfully")
    )
})

export {
    createProduct,
    getAllProducts,
    getProductBySlug,
    updateProduct,
    deleteProduct
}