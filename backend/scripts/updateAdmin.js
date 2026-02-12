import mongoose from "mongoose"
import { User } from "../src/models/user.model.js"
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.MONGODB_URL)

const updateAdmin = async () => {
  try {
    const admin = await User.findOne({ role: "admin" })

    if (admin) {
      admin.email = "admin"
      await admin.save()
      console.log("Admin email updated to admin")
    } else {
      console.log("Admin not found")
    }

    process.exit(0)
  } catch (error) {
    console.error("Error updating admin:", error)
    process.exit(1)
  }
}

updateAdmin()