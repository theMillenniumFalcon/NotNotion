import 'dotenv-safe/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { connectDB } from './database/database-connection'

const PORT = process.env.PORT

const main = async () => {

    await connectDB()

    const app = express()

    app.set("trust proxy", 1)

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

    app.use(bodyParser.json())
    app.use(cookieParser())

    app.get('/', (_, res) => {
        res.send("Server is working fine!")
    })

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