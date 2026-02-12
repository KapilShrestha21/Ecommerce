import { Router } from "express"
import { createAdmin } from "../controllers/admin.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/admin.middleware.js"
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = Router()

router.route("/create").post(
  verifyJWT,
  isAdmin,
  createAdmin
)

router.route("/dashboard").get(verifyJWT, isAdmin, getDashboardStats);


export default router
