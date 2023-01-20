const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cookieParser = require("cookie-parser")

const connectDB = require("./database/database-connection")
const pagesRoutes = require("./routes/pages")
const usersRoutes = require("./routes/users")

const PORT = process.env.PORT

const main = async () => {
    await connectDB()

    const app = express()

    app.set("trust proxy", 1)

    app.use((_: any, res: any, next: any) => {
        res.setHeader("Access-Control-Allow-Headers", "Content-Type")
        res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
        res.setHeader("Access-Control-Allow-Credentials", true as any)
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, DELETE"
        )
        next()
    })

    app.use(express.json())
    app.use(cookieParser())

    app.get('/', (_: any, res: any) => {
        res.send("Server is working fine!")
    })

    app.use("/api/pages", pagesRoutes)
    app.use("/api/users", usersRoutes)

    app.use(({ err, res }: any) => {
        console.log(err)
        const status = err.statusCode || 500
        const message = err.message
        const data = err.data
        res.status(status).json({ message: message, errCode: status, data: data })
    })

    const server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
    process.on('unhandledRejection', (err, _) => {
        console.log(`Logged Error: ${err}`)
        server.close(() => process.exit(1))
    })
}
main().catch((error) => {
    console.error(error)
})