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

/* const options: cors.CorsOptions = {
  origin: whiteList
} */

app.use(
  cors({
    origin (requestOrigin, callback) {
      if (whiteList.includes(requestOrigin as string)) {
        return callback(null, requestOrigin)
      }
      return callback(Error(`Invalid request origin ${requestOrigin as string} not allowed`))
    }
  })
)

// app.use(cors())

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRouter)

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT} origin ${process.env.ORIGIN1}`)
})
