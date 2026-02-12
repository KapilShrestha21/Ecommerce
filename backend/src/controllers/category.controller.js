import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// create category for admin
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new ApiError(400, "Category name is required");
    }

    const exists = await Category.findOne({ name });

    if (exists) {
        throw new ApiError(409, "Category already exists");
    }

    let image = {};

    if (req.file) {
        const uploaded = await uploadOnCloudinary(req.file.path);

        if (!uploaded) {
            throw new ApiError(500, "Image upload failed");
        }

        image = {
            public_id: uploaded.public_id,
            url: uploaded.secure_url,
        }
    }

    const category = await Category.create({
        name,
        image,
    });

    res.status(201).json(
        new ApiResponse(201, category, "Category created successfully")
    );
})

// get all category for public
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({
        isActive: true
    }).sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    );
})

// get all categories by admin
const getAllCategoriesAdmin = asyncHandler(async (req, res) => {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, categories, "Admin categories fetched")
    );
})

// update category for admin
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, isActive } = req.body;

    const category = await Category.findById(id)

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    if (name) category.name = name;

    if (isActive !== undefined) {
        category.isActive = isActive;
    }

    if (req.file) {
        const uploaded = await uploadOnCloudinary(req.file.path);

        if (!uploaded) {
            throw new ApiError(500, "Image upload failed");
        }

        category.image = {
            public_id: uploaded.public_id,
            url: uploaded.secure_url, // secure_url is acutomatically return by cloudinary, we didnot create it
        }
    }

    const updated = await category.save();

    res.status(200).json(
        new ApiResponse(200, updated, "Category updated successfully")
    );
})

// delete category for admin
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    await category.deleteOne()

    res.status(200).json(
        new ApiResponse(200, null, "Category deleted successfully")
    );
})



export {
    createCategory,
    getAllCategories,
    getAllCategoriesAdmin,
    updateCategory,
    deleteCategory,
}