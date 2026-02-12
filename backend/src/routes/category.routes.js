import { Router } from "express";
import {
    createCategory,
    getAllCategories,
    getAllCategoriesAdmin,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

/* ======================================================
   CATEGORY ROUTES
====================================================== */

// Create category (ADMIN)
router
    .route("/")
    .post(
        verifyJWT,
        isAdmin,
        upload.single("image"),
        createCategory
    );

// Get all categories (Frontend)
router
    .route("/")
    .get(getAllCategories);

// Get single category by admin
router
    .route("/admin")
    .get(verifyJWT,
        isAdmin,
        getAllCategoriesAdmin);

// Update category (ADMIN)
router
    .route("/:id")
    .put(
        verifyJWT,
        isAdmin,
        upload.single("image"),
        updateCategory
    );

// Delete category (ADMIN)
router
    .route("/:id")
    .delete(
        verifyJWT,
        isAdmin,
        deleteCategory
    );

export default router;
