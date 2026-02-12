import mongoose from "mongoose"
import { User } from "../src/models/user.model.js"
import dotenv from "dotenv"
import { DB_NAME } from "../src/constants.js"

dotenv.config()

mongoose.connect(
  `${process.env.MONGODB_URL}${DB_NAME}`
)
const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" })

    if (adminExists) {
      console.log("Admin already exists")
      process.exit(0)
    }

    await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: "admin@gmail.com",
      password: "12345678",
      role: "admin"
    })

    console.log("Admin created successfully")
    process.exit(0)
  } catch (error) {
    console.error("Error creating admin:", error)
    process.exit(1)
  }
}

createAdmin()
