import 'dotenv-safe/config'
import express from 'express'
import { connectDB } from './database/database-connection'

const PORT = process.env.PORT

const main = async () => {
    await connectDB()
    const app = express()

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