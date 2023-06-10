import 'dotenv/config'
import express from 'express'
import './database/connectdb'
import authRouter from './routes/auth.routes'
import cookieParser from 'cookie-parser'
import linkRouter from './routes/link.routes'
import cors from 'cors'

const PORT = process.env.PORT !== undefined ? process.env.PORT : 5000

const app = express()

const whiteList = [process.env.ORIGIN1] as string[]

const options: cors.CorsOptions = {
  origin: whiteList
}

app.use(cors(options))

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRouter)

app.listen(PORT, () => { console.log(`server listening on port ${PORT}`) })
