const mongoose = require('mongoose')

mongoose.set("strictQuery", false)
const connectDB = async () => {
    mongoose.connect(process.env.DATABASE_URI)
    console.log('Database connected')
}

module.exports = connectDB
