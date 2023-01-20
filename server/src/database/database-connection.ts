import mongoose from "mongoose"

mongoose.set("strictQuery", false)
const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URI)
    console.log('Database connected')
}

module.exports = connectDB