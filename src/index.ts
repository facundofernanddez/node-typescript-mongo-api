import 'dotenv/config'
import express from 'express'
import './database/connectdb'
import authRouter from './routes/auth.routes'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT !== undefined ? process.env.PORT : 5000

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => { console.log(`server listening on port ${PORT}`) })
