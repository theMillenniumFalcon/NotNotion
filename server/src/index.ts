import 'dotenv-safe/config'
import express from 'express'
import { connectDB } from './database/database-connection'

const PORT = process.env.PORT

const main = async () => {

    await connectDB()

    const app = express()

    app.use((_req, res, next) => {
        res.setHeader("Access-Control-Allow-Headers", "Content-Type")
        res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
        res.setHeader("Access-Control-Allow-Credentials", true as any)
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, DELETE"
        )
        next()
    })

    app.set("trust proxy", 1)

    app.get('/', (_, res) => {
        res.send("Server is working fine!")
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