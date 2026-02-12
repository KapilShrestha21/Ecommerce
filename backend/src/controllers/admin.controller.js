import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"

const createAdmin = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if ([firstName, lastName, email, password].some(f => !f?.trim())) { // ! le value xa bhane false banaidinxa, false bhayo bhane error throw gardaina, true bhayo bhane error throw garxa
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email })
    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }

    const admin = await User.create({
        firstName,
        lastName,
        email,
        password,
        role: "admin"
    })

    const createdAdmin = await User.findById(admin._id)
        .select("-password -refreshToken")

    res
        .status(201)
        .json(new ApiResponse(201, createdAdmin, "Admin created successfully"))
})

export {
    createAdmin
}