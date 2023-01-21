const dotenv = require("dotenv")
dotenv.config()
const path = require("path")
const fs = require("fs")
const express = require("express")
const cookieParser = require("cookie-parser")
const multer = require("multer")

const connectDB = require("./database/database-connection")
const pagesRoutes = require("./routes/pages")
const usersRoutes = require("./routes/users")

const PORT = parseInt(process.env.PORT) || 4000

// Configuration where images should be stored and named
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const pageId = req.query.pageId
            if (!pageId) {
                const err = new Error("Cannot upload image. No page id provided.")
                err.statusCode = 422
                throw err
            }
            const dir = `src/images/${pageId}`
            fs.access(dir, (err) => {
                if (err) {
                    return fs.mkdir(dir, (err) => cb(err, dir))
                } else {
                    return cb(null, dir)
                }
            })
        } catch (err) {
            console.log(err)
            return cb(err, dir)
        }
    },
    filename: (req, file, cb) => {
        const hash =
            new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
        cb(null, hash + "-" + file.originalname)
    },
})

// Only allow image files to be uploaded
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const main = async () => {
    await connectDB()

    const app = express()

    app.set("trust proxy", 1)

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Headers", "Content-Type")
        res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
        res.setHeader("Access-Control-Allow-Credentials", true)
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, DELETE"
        )
        next()
    })

    app.use(express.json())
    app.use(cookieParser())

    app.use(
        multer({
            storage: fileStorage,
            limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
            fileFilter: fileFilter,
        }).single("image")
    )

    app.get('/', (req, res) => {
        res.send("Server is working fine!")
    })

    app.use("/api/images", express.static(path.join(__dirname, "images")))
    app.use("/api/pages", pagesRoutes)
    app.use("/api/users", usersRoutes)

    app.use((err, res) => {
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