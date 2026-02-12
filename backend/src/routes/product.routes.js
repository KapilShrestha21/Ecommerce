import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

/* ================= PRODUCTS ================= */

// PUBLIC
router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);

// ADMIN
router.post("/",verifyJWT,isAdmin,
  upload.array("images", 5),
  createProduct
);

router.put("/id/:id",verifyJWT,isAdmin,
  upload.array("images", 5),
  updateProduct
);

router.delete("/id/:id",verifyJWT,isAdmin,deleteProduct);

export default router;
